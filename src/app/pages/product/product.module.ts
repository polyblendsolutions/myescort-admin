import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { AllProductComponent } from './all-product/all-product.component';
import { AddProductComponent } from './add-product/add-product.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from 'src/app/material/material.module';
import {DirectivesModule} from '../../shared/directives/directives.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DigitOnlyModule } from '@uiowa/digit-only';
import {AuthorSelectModule} from '../../shared/lazy/author-select/author-select.module';
import { PublisherSelectModule } from "../../shared/lazy/publisher-select/publisher-select.module";
import {CategorySelectModule} from '../../shared/lazy/category-select/category-select.module';
import {SubCategorySelectModule} from '../../shared/lazy/sub-category-select/sub-category-select.module';
import { BrandSelectModule } from 'src/app/shared/lazy/brand-select/brand-select.module';
import {QuillEditorComponent} from "ngx-quill";
import {TypeSelectModule} from "../../shared/lazy/type-select/type-select.module";
import {IntimateSelectModule} from "../../shared/lazy/intimate-select/intimate-select.module";
import {HairSelectModule} from "../../shared/lazy/hair-select/hair-select.module";
import {OrientationModule} from "../../shared/lazy/orientation/orientation.module";
import {RegionModule} from "../../shared/lazy/region/region.module";
import {NgxMatDatetimePickerModule, NgxMatNativeDateModule} from "@angular-material-components/datetime-picker";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {NgxMatTimepickerModule} from "ngx-mat-timepicker";
import { AddProductSecondComponent } from './add-product-second/add-product-second.component';

@NgModule({
    declarations: [
        AllProductComponent,
        AddProductComponent,
        AddProductSecondComponent
    ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    NgxDropzoneModule,
    FormsModule,
    NgxPaginationModule,
    MaterialModule,
    DirectivesModule,
    PipesModule,
    FlexLayoutModule,
    DigitOnlyModule,
    AuthorSelectModule,
    BrandSelectModule,
    PublisherSelectModule,
    CategorySelectModule,
    SubCategorySelectModule,
    QuillEditorComponent,
    TypeSelectModule,
    IntimateSelectModule,
    HairSelectModule,
    OrientationModule,
    RegionModule,
    MatDatepickerModule,
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
  ]
})
export class ProductModule { }
