import { Component, OnInit, inject } from "@angular/core";
import { Firestore, collectionData } from "@angular/fire/firestore";
import { ToastrService } from "ngx-toastr";
import { FrameService } from "src/app/services/frame.service";
import Swal from 'sweetalert2';

@Component({
  selector: "app-list-frames",
  templateUrl: "./list-frames.component.html",
  styleUrls: ["./list-frames.component.css"],
})
export class ListFramesComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  frames: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalItems: number = 0;

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
      this.totalItems = this.frames.length;
    });
    console.log(this.frames);
  }
  confirmDeleteFrame(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteFrame(id);
      }
    });
  }
  deleteFrame(id: string) {
    this.frameService
      .deleteFrame(id)
      .then(() => {
        this.toastr.error("Anteojo eliminado con éxito", "Registro Eliminado", {
          positionClass: "toast-bottom-right",
        });
        console.log("Anteojo eliminado con éxito");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }
  pageNumbers(): number[] {
    return Array.from({ length: this.totalPages() }, (_, index) => index + 1);
  }
}
