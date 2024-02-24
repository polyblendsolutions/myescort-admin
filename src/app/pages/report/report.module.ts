import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { AllReportComponent } from './all-report/all-report.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from 'src/app/material/material.module';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';


@NgModule({
  declarations: [
    AllReportComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    FormsModule,
    NgxPaginationModule,
    MaterialModule,
    DirectivesModule,
  ]
})
export class ReportModule { }
