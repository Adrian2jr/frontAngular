import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ModalEditTaskComponent } from "../modal-edit-task/modal-edit-task.component";
import { Task } from "src/app/interfaces/task.interface";
import { TaskService } from "src/app/services/task.service";

@Component({
  selector: "app-user-tasks",
  templateUrl: "./user-tasks.component.html",
  styleUrls: ["./user-tasks.component.css"],
})
export class UserTasksComponent implements OnInit {
  constructor(private taskService: TaskService, public dialog: MatDialog) {
    this.tasks = taskService.getAllTasks().sort((a, b) => {
      // Ordenar en orden descendente (la tarea más reciente primero)
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
  }

  ngOnInit() {}

  tasks: Task[] = [];
  newTask: Task = {
    id: 0,
    title: "",
    description: "",
    completed: false,
    createdAt: new Date(),
  };
  editingTask: Task | null = null;
  isCompletedMessageVisible = false;

  onCreateTask(): void {
    if (this.newTask.title.trim() === "") {
      return;
    }

    const highestId = this.tasks.reduce(
      (maxId, task) => (task.id > maxId ? task.id : maxId),
      0
    );

    this.newTask.id = highestId + 1;
    this.tasks.unshift(this.newTask);

    this.newTask = {
      id: 0,
      title: "",
      description: "",
      completed: false,
      createdAt: new Date(),
    };
  }

  editTask(task: Task): void {
    const dialogRef = this.dialog.open(ModalEditTaskComponent, {
      data: task,
      disableClose: true,
      autoFocus: false,
      width: "600px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      const { title, description } = result;

      task.title = title;
      task.description = description;
    });
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
    this.tasks = this.taskService.getAllTasks();
  }

  onToggleCompleted(task: Task): void {
    task.completed = !task.completed;
    this.taskService.updateTask(task);
    this.tasks = this.taskService.getAllTasks();
    this.isCompletedMessageVisible = task.completed;
  }
}
