import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SpinnerComponent } from "./spinner/spinner.component";
import { MaterialuiModule } from "../materialui/materialui.module";

@NgModule({
  declarations: [SpinnerComponent],
  imports: [CommonModule, MaterialuiModule],
  exports: [SpinnerComponent],
})
export class SharedComponentsModule {}
