import { Component, OnInit, inject } from "@angular/core";
import { Firestore, collectionData } from "@angular/fire/firestore";
import { ToastrService } from "ngx-toastr";
import { FrameService } from "src/app/services/frame.service";

@Component({
  selector: "app-list-frames",
  templateUrl: "./list-frames.component.html",
  styleUrls: ["./list-frames.component.css"],
})
export class ListFramesComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  frames: any[] = [];

  constructor(
    private frameService: FrameService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getFrames();
  }

  getFrames() {
    this.frameService.getFrames().subscribe((data) => {
      this.frames = [];
      data.forEach((element: any) => {
        // console.log(element.payload.doc.id);
        this.frames.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
    });
    console.log(this.frames);
  }

  deleteFrame(id: string) {
    this.frameService
      .deleteFrame(id)
      .then(() => {
        this.toastr.error('Anteojo eliminado con éxito', 'Registro Eliminado')
        console.log("Anteojo eliminado con éxito");
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
