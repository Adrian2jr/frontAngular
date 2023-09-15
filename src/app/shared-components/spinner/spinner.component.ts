import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-spinner",
  templateUrl: "./spinner.component.html",
  styles: [
    `
      .center {
        position: absolute;
        top: 50%;
        left: 50%;
        -moz-transform: translateX(-50%) translateY(-50%);
        -webkit-transform: translateX(-50%) translateY(-50%);
        transform: translateX(-50%) translateY(-50%);
      }
      .overlay {
        height: 100vh;
        width: 100%;
        background-color: rgba(255, 255, 255, 0.286);
        z-index: 10;
        top: 0;
        left: 0;
        position: fixed;
      }

      .spinner {
        margin: 0 auto;
      }

      .msg {
        margin-top: 1rem;
        text-align: center;
        color: black;
        font-weight: 500;
      }
    `,
  ],
})
export class SpinnerComponent implements OnInit {
  @Input() value: number = 100;
  @Input() diameter: number = 100;
  @Input() mode: string = "indeterminate";
  @Input() strokeWidth: number = 10;
  @Input() overlay: boolean = false;
  @Input() color: string = "primary";
  @Input() msg: string = "";

  constructor() {}

  ngOnInit(): void {}
}
