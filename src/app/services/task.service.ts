import { Injectable } from "@angular/core";
import { Task } from "../interfaces/task.interface";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getTasksByUserId(id: number) {
    const url = `${this.baseUrl}/tareas/${id}`;
    const headers = new HttpHeaders();
    return this.http.get<any>(url, { headers });
  }

  postNewTask(task: Task) {
    const url = `${this.baseUrl}/tareas`;
    const body = {
      title: task.title,
      description: task.description,
      completed: task.completed,
      createdAt: task.createdAt,
      userId: task.userId,
    };

    return this.http.post<any>(url, body);
  }

  putTask(task: Task) {
    const url = `${this.baseUrl}/tareas`;
    const body = {
      title: task.title,
      description: task.description,
      completed: task.completed,
      id: task.id,
    };

    return this.http.put<any>(url, body);
  }

  deleteTask(id: number) {
    const url = `${this.baseUrl}/tareas/${id}`;
    return this.http.delete<any>(url);
  }
}
