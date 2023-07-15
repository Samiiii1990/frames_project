import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable, finalize } from "rxjs";
import { FrameService } from "src/app/services/frame.service";
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: "app-create-frame",
  templateUrl: "./create-frame.component.html",
  styleUrls: ["./create-frame.component.css"],
})
export class CreateFrameComponent implements OnInit {
  createFrame: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  title = 'Agregar Anteojo';
  buttonText = 'Agregar';

  imageUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    private frameService: FrameService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute,
    private storage: AngularFireStorage,
  ) {
    this.createFrame = this.fb.group({
      model: ["", Validators.required],
      gender: ["", Validators.required],
      material: ["", Validators.required],
      style: ["", Validators.required],
      color: ["", Validators.required],
    });
    this.id = this.aRoute.snapshot.paramMap.get("id");
    console.log(this.id);
  }
  ngOnInit(): void {
    this.setFrame();
  }

  addOrEditFrame(){
    this.submitted = true;
    if (this.createFrame.invalid) {
      return;
    }
    if(this.id === null){
      this.addFrame();
    }else{
      this.editFrame(this.id)
    }
  }

  addFrame() {
    const frame: any = {
      model: this.createFrame.value.model,
      gender: this.createFrame.value.gender,
      material: this.createFrame.value.material,
      style: this.createFrame.value.style,
      color: this.createFrame.value.color,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.loading = true;
    this.frameService
      .addFrame(frame, this.imageUrl)
      .then(() => {
        this.toastr.success("Anteojo creado con éxito", "Anteojo Registrado");
        this.loading = true;
        this.router.navigate(["/list-frames"]);
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
  }

  editFrame(id: string){
    const frame: any = {
      model: this.createFrame.value.model,
      gender: this.createFrame.value.gender,
      material: this.createFrame.value.material,
      style: this.createFrame.value.style,
      color: this.createFrame.value.color,
      updatedAt: new Date(),
    };
    this.loading =true;
    this.frameService.updateFrame(id,frame, this.imageUrl).then(()=>{
      this.loading =false;
      this.toastr.info('Anteojo modificado correctamente', 'Anteojo Modificado')
      this.router.navigate(["/list-frames"]);

    })
  }
  setFrame() {
    if (this.id !== null) {
      this.title = 'Editar Anteojo';
      this.buttonText = 'Guardar';
      this.loading = true;
      this.frameService.getFrameById(this.id).subscribe((data) => {
        this.loading = false;
        console.log(data.payload.data()["model"]);
        this.createFrame.setValue({
          model: data.payload.data()["model"],
          gender: data.payload.data()["gender"],
          material: data.payload.data()["material"],
          style: data.payload.data()["style"],
          color: data.payload.data()["color"],
        });
      });
    }
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    // Generate a unique ID for the file
    const fileId = Math.random().toString(36).substring(2);

    // Create a file path in Firebase Storage
    const filePath = `frames/${fileId}`;

    // Upload file to Firebase Storage
    const task = this.storage.upload(filePath, file);
    console.log("🚀 ~ file: create-frame.component.ts:128 ~ CreateFrameComponent ~ onFileSelected ~ task:", task)

    // Get notified when the upload is complete
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          // Get the download URL of the uploaded file
          this.storage.ref(filePath)
            .getDownloadURL()
            .subscribe((url: string) => {
              // Set the image URL to display in the HTML template
              this.imageUrl = url;
              console.log("🚀 ~ file: create-frame.component.ts:139 ~ CreateFrameComponent ~ .subscribe ~ url:", url)
            });
        })
      )
      .subscribe();
  }
}
