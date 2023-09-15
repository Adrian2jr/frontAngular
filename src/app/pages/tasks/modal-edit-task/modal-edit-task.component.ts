import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Task } from "src/app/interfaces/task.interface";

@Component({
  selector: "app-modal-edit-task",
  templateUrl: "./modal-edit-task.component.html",
  styleUrls: ["./modal-edit-task.component.css"],
})
export class ModalEditTaskComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Task,
    public dialogRef: MatDialogRef<ModalEditTaskComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.formEditTask.patchValue(this.data);
  }

  formEditTask: FormGroup = this.fb.group({
    title: ["", [Validators.required]],
    description: ["", [Validators.required]],
  });

  editTask() {
    if (this.formEditTask.invalid) return this.formEditTask.markAllAsTouched();
    this.dialogRef.close(this.formEditTask.value);
  }
}
