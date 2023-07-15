import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateFrameComponent } from "./components/create-frame/create-frame.component";
import { ListFramesComponent } from "./components/list-frames/list-frames.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "list-frames",
    pathMatch: "full",
  },
  {
    path: "list-frames",
    component: ListFramesComponent,
  },
  {
    path: "create-frame",
    component: CreateFrameComponent,
  },
  {
    path: "edit-frame/:id",
    component: CreateFrameComponent,
  },
  {
    path: "**",
    redirectTo: "list-frames",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
