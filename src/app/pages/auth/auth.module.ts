import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";
import { MaterialuiModule } from "src/app/materialui/materialui.module";
import { SharedComponentsModule } from "src/app/shared-components/shared-components.module";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialuiModule,
    SharedComponentsModule,
  ],
})
export class AuthModule {}
