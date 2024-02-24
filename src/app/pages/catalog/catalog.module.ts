import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { AllCategoryComponent } from './category/all-category/all-category.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from 'src/app/material/material.module';
import {DirectivesModule} from '../../shared/directives/directives.module';
import { AllSubCategoryComponent } from './sub-category/all-sub-category/all-sub-category.component';
import { AddSubCategoryComponent } from './sub-category/add-sub-category/add-sub-category.component';
import { AllPublisherComponent } from './publisher/all-publisher/all-publisher.component';
import { AddPublisherComponent } from './publisher/add-publisher/add-publisher.component';
import { AllAuthorComponent } from './author/all-author/all-author.component';
import { AddAuthorComponent } from './author/add-author/add-author.component';
import { AllTagComponent } from './tag/all-tag/all-tag.component';
import { AddTagComponent } from './tag/add-tag/add-tag.component';
import {AutoSlugDirective} from "../../shared/directives/auto-slug.directive";
import { AddBrandComponent } from './brand/add-brand/add-brand.component';
import { AllBrandComponent } from './brand/all-brand/all-brand.component';
import { AddTypeComponent } from './types/add-type/add-type.component';
import { AllTypesComponent } from './types/all-types/all-types.component';
import { AddBodyTypeComponent } from './bodyType/add-body-type/add-body-type.component';
import { AllBodyTypeComponent } from './bodyType/all-body-type/all-body-type.component';
import { AddHairColorComponent } from './hairColor/add-hair-color/add-hair-color.component';
import { AllHairColorComponent } from './hairColor/all-hair-color/all-hair-color.component';
import { AddIntimateHairComponent } from './intimateHair/add-intimate-hair/add-intimate-hair.component';
import { AllIntimateHairComponent } from './intimateHair/all-intimate-hair/all-intimate-hair.component';
import { AddOrientationComponent } from './orientation/add-orientation/add-orientation.component';
import { AllOrientationComponent } from './orientation/all-orientation/all-orientation.component';
import { AddRegionComponent } from './region/add-region/add-region.component';
import { AllRegionComponent } from './region/all-region/all-region.component';
@NgModule({
  declarations: [


    AddCategoryComponent,
        AllCategoryComponent,
        AllSubCategoryComponent,
        AddSubCategoryComponent,
        AllPublisherComponent,
        AddPublisherComponent,
        AllAuthorComponent,
        AddAuthorComponent,
        AllTagComponent,
        AddTagComponent,
        AddBrandComponent,
        AllBrandComponent,
        AddTypeComponent,
        AllTypesComponent,
        AddBodyTypeComponent,
        AllBodyTypeComponent,
        AddHairColorComponent,
        AllHairColorComponent,
        AddIntimateHairComponent,
        AllIntimateHairComponent,
        AddOrientationComponent,
        AllOrientationComponent,
        AddRegionComponent,
        AllRegionComponent
  ],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    NgxDropzoneModule,
    FormsModule,
    NgxPaginationModule,
    MaterialModule,
    DirectivesModule,
  ]
})
export class CatalogModule { }
