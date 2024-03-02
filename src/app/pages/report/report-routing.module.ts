import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllReportComponent } from './all-report/all-report.component';
import { ViewReportComponent } from './view-report/view-report.component';


const routes: Routes = [
  {path: 'all-report', component: AllReportComponent},
  {path: 'view-report/:id', component: ViewReportComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
