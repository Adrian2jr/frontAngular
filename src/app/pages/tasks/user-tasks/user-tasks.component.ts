import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ModalEditTaskComponent } from "../modal-edit-task/modal-edit-task.component";
import { Task } from "src/app/interfaces/task.interface";
import { TaskService } from "src/app/services/task.service";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-user-tasks",
  templateUrl: "./user-tasks.component.html",
  styleUrls: ["./user-tasks.component.css"],
})
export class UserTasksComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    public dialog: MatDialog,
    private authService: AuthService
  ) {
    // this.tasks = taskService.getAllTasks().sort((a, b) => {
    //   return b.createdAt.getTime() - a.createdAt.getTime();
    // });
  }

  get user() {
    return this.authService.user;
  }

  uid = this.user.id;
  username: string = this.user.username;
  tasks: Task[] = [];
  newTask: Task = {
    id: 0,
    title: "",
    description: "",
    completed: false,
    createdAt: new Date(),
    userId: this.uid,
  };

  ngOnInit() {
    this.getProductsByCategory(this.uid);
  }

  async getProductsByCategory(id: number) {
    this.taskService.getTasksByUserId(id).subscribe({
      next: (data) => {
        this.tasks = data;
      },
      error: () => {
        Swal.fire({
          icon: "error",
          text: "No se pudo cargar las tareas",
        });
      },
    });
  }

  onCreateTask(): void {
    if (this.newTask.title.trim() === "") {
      return;
    }

    this.taskService.postNewTask(this.newTask).subscribe({
      next: (data) => {
        Swal.fire({
          icon: "success",
          text: "Tarea creada correctamente",
          timer: 2000,
        });

        this.tasks.unshift(data.Task);
        this.newTask.title = "";
        this.newTask.description = "";
      },
      error: () => {
        Swal.fire({
          icon: "error",
          text: "No se pudo crear la tarea",
        });
      },
    });
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

      this.taskService
        .putTask({
          ...task,
          title,
          description,
        })
        .subscribe({
          next: (data) => {
            Swal.fire({
              icon: "success",
              text: "Tarea editada correctamente",
              timer: 2000,
            });

            this.tasks = this.tasks.map((task) => {
              if (task.id === data.Task.id) {
                return data.Task;
              }
              return task;
            });
          },

          error: () => {
            Swal.fire({
              icon: "error",
              text: "No se pudo editar la tarea",
            });
          },
        });
    });
  }

  deleteTask(id: number): void {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#d33",
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        this.taskService.deleteTask(id).subscribe({
          next: (data) => {
            console.log(data);
            this.tasks = this.tasks.filter((task) => task.id !== id);
          },
          error: () => {
            Swal.fire({
              icon: "error",
              text: "No se pudo eliminar la tarea",
            });
          },
        });
      }
    });
  }

  onToggleCompleted(task: Task): void {
    this.taskService
      .putTask({
        ...task,
        completed: !task.completed,
      })
      .subscribe({
        next: (data) => {
          this.tasks = this.tasks.map((task) => {
            if (task.id === data.Task.id) {
              return data.Task;
            }
            return task;
          });
        },
        error: () => {
          Swal.fire({
            icon: "error",
            text: "No se pudo marcar como completada la tarea",
          });
        },
      });
  }

  logout(): void {
    this.authService.logout();
  }
}
