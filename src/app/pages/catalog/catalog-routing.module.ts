import { AddBrandComponent } from './brand/add-brand/add-brand.component';
import { AllBrandComponent } from './brand/all-brand/all-brand.component';
import { AddTagComponent } from './tag/add-tag/add-tag.component';
import { AllTagComponent } from './tag/all-tag/all-tag.component';
import { AddAuthorComponent } from './author/add-author/add-author.component';
import { AllAuthorComponent } from './author/all-author/all-author.component';
import { AddPublisherComponent } from './publisher/add-publisher/add-publisher.component';
import { AllPublisherComponent } from './publisher/all-publisher/all-publisher.component';
import { AllCategoryComponent } from './category/all-category/all-category.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { AllSubCategoryComponent } from './sub-category/all-sub-category/all-sub-category.component';
import { AddSubCategoryComponent } from './sub-category/add-sub-category/add-sub-category.component';
import {AllTypesComponent} from "./types/all-types/all-types.component";
import {AddTypeComponent} from "./types/add-type/add-type.component";
import {AllBodyTypeComponent} from "./bodyType/all-body-type/all-body-type.component";
import {AddBodyTypeComponent} from "./bodyType/add-body-type/add-body-type.component";
import {AllIntimateHairComponent} from "./intimateHair/all-intimate-hair/all-intimate-hair.component";
import {AddIntimateHairComponent} from "./intimateHair/add-intimate-hair/add-intimate-hair.component";
import {AllHairColorComponent} from "./hairColor/all-hair-color/all-hair-color.component";
import {AddHairColorComponent} from "./hairColor/add-hair-color/add-hair-color.component";
import {AllOrientationComponent} from "./orientation/all-orientation/all-orientation.component";
import {AddOrientationComponent} from "./orientation/add-orientation/add-orientation.component";
import {AllRegionComponent} from "./region/all-region/all-region.component";
import {AddRegionComponent} from "./region/add-region/add-region.component";

const routes: Routes = [
  {path: 'all-categories', component: AllCategoryComponent},
  {path: 'add-category', component: AddCategoryComponent},
  {path: 'edit-category/:id', component: AddCategoryComponent},
  {path: 'all-subCategories', component: AllSubCategoryComponent},
  {path: 'add-subCategory', component: AddSubCategoryComponent},
  {path: 'edit-subCategory/:id', component: AddSubCategoryComponent},
  {path: 'all-publisher', component: AllPublisherComponent},
  {path: 'add-publisher', component: AddPublisherComponent},
  {path: 'edit-publisher/:id', component: AddPublisherComponent},
  {path: 'all-author', component: AllAuthorComponent},
  {path: 'add-author', component: AddAuthorComponent},
  {path: 'edit-author/:id', component: AddAuthorComponent},
  {path: 'all-tag', component: AllTagComponent},
  {path: 'add-tag', component: AddTagComponent},
  {path: 'edit-tag/:id', component: AddTagComponent},
  {path: 'all-type', component: AllTypesComponent},
  {path: 'add-type', component: AddTypeComponent},
  {path: 'edit-type/:id', component: AddTypeComponent},
  {path: 'all-bodyType', component: AllBodyTypeComponent},
  {path: 'add-bodyType', component: AddBodyTypeComponent},
  {path: 'edit-bodyType/:id', component: AddBodyTypeComponent},
  {path: 'all-intimateHair', component: AllIntimateHairComponent},
  {path: 'add-intimateHair', component: AddIntimateHairComponent},
  {path: 'edit-intimateHair/:id', component: AddIntimateHairComponent},
  {path: 'all-hairColor', component: AllHairColorComponent},
  {path: 'add-hairColor', component: AddHairColorComponent},
  {path: 'edit-hairColor/:id', component: AddHairColorComponent},
  {path: 'all-orientation', component: AllOrientationComponent},
  {path: 'add-orientation', component: AddOrientationComponent},
  {path: 'edit-orientation/:id', component: AddOrientationComponent},
  {path: 'all-region', component: AllRegionComponent},
  {path: 'add-region', component: AddRegionComponent},
  {path: 'edit-region/:id', component: AddRegionComponent},
  {path: 'all-brand', component: AllBrandComponent},
  {path: 'add-brand', component: AddBrandComponent},
  {path: 'edit-brand/:id', component: AddBrandComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
