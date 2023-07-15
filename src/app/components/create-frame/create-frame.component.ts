import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable, finalize } from "rxjs";
import { FrameService } from "src/app/services/frame.service";
import { AngularFireStorage } from "@angular/fire/compat/storage";

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
  title = "Agregar Anteojo";
  buttonText = "Agregar";

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private frameService: FrameService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute,
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

  addOrEditFrame() {
    this.submitted = true;
    if (this.createFrame.invalid) {
      return;
    }
    if (this.id === null) {
      this.addFrame();
    } else {
      this.editFrame(this.id);
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
    const imageFile: File = this.fileInput.nativeElement.files[0];
  
    this.loading = true;
    this.frameService.addFrame(frame, imageFile)
      .then(() => {
        this.toastr.success('Anteojo creado con éxito', 'Anteojo Registrado');
        this.loading = true;
        this.router.navigate(['/list-frames']);
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
  }
  editFrame(id: string) {
    const frame: any = {
      model: this.createFrame.value.model,
      gender: this.createFrame.value.gender,
      material: this.createFrame.value.material,
      style: this.createFrame.value.style,
      color: this.createFrame.value.color,
      updatedAt: new Date(),
    };
    this.loading = true;
    this.frameService.updateFrame(id,frame).then(() => {
      this.loading = false;
      this.toastr.info(
        "Anteojo modificado correctamente",
        "Anteojo Modificado"
      );
      this.router.navigate(["/list-frames"]);
    });
  }
  setFrame() {
    if (this.id !== null) {
      this.title = "Editar Anteojo";
      this.buttonText = "Guardar";
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

}
