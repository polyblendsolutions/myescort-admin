import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionComponent } from './region.component';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSelectInfiniteScrollModule} from "ng-mat-select-infinite-scroll";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    RegionComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSelectInfiniteScrollModule,
    NgxMatSelectSearchModule,
    MatIconModule
  ],
  exports:[
    RegionComponent
  ]
})
export class RegionModule { }
