import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllReportComponent } from './all-report/all-report.component';


const routes: Routes = [
  {path: 'all-report', component: AllReportComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
