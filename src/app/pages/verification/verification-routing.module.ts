import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VerificationComponent} from "./verification.component";
import { ViewVerificationComponent } from './view-verification/view-verification.component';


const routes: Routes = [
  {path: '', component: VerificationComponent},
  {path: 'view-verification/:id', component: ViewVerificationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerificationRoutingModule { }
