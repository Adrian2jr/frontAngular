import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ModalEditTaskComponent } from "../modal-edit-task/modal-edit-task.component";
import { Task } from "src/app/interfaces/task.interface";
import { TaskService } from "src/app/services/task.service";
import { AuthService } from "src/app/services/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  get user() {
    return this.authService.user;
  }

  isLoadingSpinner: boolean = false;
  uid = this.user.id;
  username: string = this.user.username;
  tasks: Task[] = [];

  taskForm: FormGroup = this.fb.group({
    title: ["", [Validators.required]],
    description: ["", [Validators.required]],
  });

  ngOnInit() {
    this.getProductsByCategory(this.uid);
  }

  async getProductsByCategory(id: number) {
    this.isLoadingSpinner = true;
    this.taskService.getSortedTasksByUserId(id).subscribe({
      next: (data) => {
        this.tasks = data;
        this.isLoadingSpinner = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoadingSpinner = false;
        Swal.fire({
          icon: "error",
          text: "No se pudo cargar las tareas",
        });
      },
    });
  }

  onCreateTask(): void {
    if (this.taskForm.invalid) return this.taskForm.markAllAsTouched();
    this.isLoadingSpinner = true;

    const taskBody: Task = {
      id: 0,
      title: this.taskForm.value.title,
      description: this.taskForm.value.description,
      completed: false,
      createdAt: new Date(),
      userId: this.uid,
    };

    this.taskService.postNewTask(taskBody).subscribe({
      next: (data) => {
        this.isLoadingSpinner = false;
        Swal.fire({
          icon: "success",
          text: "Tarea creada correctamente",
          timer: 2000,
        });

        this.tasks.unshift(data.Task);
      },
      error: () => {
        this.isLoadingSpinner = false;
        Swal.fire({
          icon: "error",
          text: "No se pudo crear la tarea",
          timer: 2000,
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

      this.isLoadingSpinner = true;
      this.taskService
        .putTask({
          ...task,
          title,
          description,
        })
        .subscribe({
          next: (data) => {
            this.isLoadingSpinner = false;
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
            this.isLoadingSpinner = false;
            Swal.fire({
              icon: "error",
              text: "No se pudo editar la tarea",
              timer: 2000,
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
        this.isLoadingSpinner = true;
        this.taskService.deleteTask(id).subscribe({
          next: () => {
            Swal.fire({
              icon: "success",
              text: "Tarea eliminada correctamente",
              timer: 2000,
            });

            this.tasks = this.tasks.filter((task) => task.id !== id);
            this.isLoadingSpinner = false;
          },
          error: () => {
            this.isLoadingSpinner = false;
            Swal.fire({
              icon: "error",
              text: "No se pudo eliminar la tarea",
              timer: 2000,
            });
          },
        });
      }
    });
  }

  onToggleCompleted(task: Task): void {
    this.isLoadingSpinner = true;
    this.taskService
      .putTask({
        ...task,
        completed: !task.completed,
      })
      .subscribe({
        next: (data) => {
          this.tasks = this.tasks.map((task) => {
            this.isLoadingSpinner = false;

            if (task.id === data.Task.id) {
              return data.Task;
            }
            return task;
          });
        },
        error: () => {
          this.isLoadingSpinner = false;
          Swal.fire({
            icon: "error",
            text: "No se pudo marcar como completada la tarea",
            timer: 2000,
          });
        },
      });
  }

  logout(): void {
    this.authService.logout();
  }
}
