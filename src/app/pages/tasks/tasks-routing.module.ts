import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserTasksComponent } from "./user-tasks/user-tasks.component";

const routes: Routes = [
  {
    path: "",
    component: UserTasksComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
