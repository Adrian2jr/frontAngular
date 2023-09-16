import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TasksRoutingModule } from "./tasks-routing.module";
import { UserTasksComponent } from "./user-tasks/user-tasks.component";
import { FormsModule } from "@angular/forms";
import { MaterialuiModule } from "../../materialui/materialui.module";
import { ModalEditTaskComponent } from "./modal-edit-task/modal-edit-task.component";
import { SharedComponentsModule } from "src/app/shared-components/shared-components.module";

@NgModule({
  declarations: [UserTasksComponent, ModalEditTaskComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    FormsModule,
    MaterialuiModule,
    SharedComponentsModule,
  ],
  entryComponents: [ModalEditTaskComponent],
})
export class TasksModule {}
