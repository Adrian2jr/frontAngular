import { Injectable } from "@angular/core";
import { Task } from "../interfaces/task.interface";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private tasks: Task[] = [
    {
      id: 1,
      title: "App Todo",
      description:
        "Realizar la aplicación de tareas con Angular 8 con un backend en .NET 4.8",
      completed: false,
      createdAt: new Date(),
    },
  ];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(task: Task): void {
    this.tasks.push(task);
  }

  updateTask(task: Task): void {
    const index = this.tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = task;
    }
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
