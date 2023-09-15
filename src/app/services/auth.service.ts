import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AuthResponse } from "../interfaces/auth.interface";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  get user() {
    const user = localStorage.getItem("user");
    if (user) return JSON.parse(user);
  }

  login(email: string, password: string) {
    const url = `${this.baseUrl}/usuarios/login`;
    const body = { email, password };

    return this.http.post<AuthResponse>(url, body);
  }

  logout() {
    localStorage.clear();
  }
}
