import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntimateSelectComponent } from './intimate-select.component';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSelectInfiniteScrollModule} from "ng-mat-select-infinite-scroll";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    IntimateSelectComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSelectInfiniteScrollModule,
    NgxMatSelectSearchModule,
    MatIconModule,
  ],
  exports:[
    IntimateSelectComponent
  ]
})
export class IntimateSelectModule { }
