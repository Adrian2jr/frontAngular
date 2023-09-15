import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  isLoadingSpinner: boolean = false;
  formLogin: FormGroup = this.fb.group({
    email: ["", [Validators.required]],
    password: ["", [Validators.required]],
  });

  login() {
    if (this.formLogin.invalid) return this.formLogin.markAllAsTouched();
    this.isLoadingSpinner = true;
    const { email, password } = this.formLogin.value;

    this.authService.login(email, password).subscribe({
      next: (resp) => {
        if (resp.ok) {
          const { id, username } = resp;
          localStorage.setItem("user", JSON.stringify({ id, username }));
          this.router.navigate(["/tasks"]);
          return;
        }

        this.isLoadingSpinner = false;
        Swal.fire({
          icon: "error",
          title: resp.msg,
          timer: 2000,
        });
      },
      error: (err) => {
        this.isLoadingSpinner = false;
        Swal.fire({
          icon: "error",
          title: "Ocurrio un error:",
          text: err.error.msg,
          timer: 2000,
        });
      },
    });
  }
}
