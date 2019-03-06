import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { CameraBillComponent } from "./components/camera-bill/camera-bill.component";

;

const routes: Routes = [
    { path: "", redirectTo: "/camera/bill", pathMatch: "full" },
    { path: "camera/bill", component: CameraBillComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
