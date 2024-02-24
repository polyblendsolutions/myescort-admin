import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReviewRoutingModule} from './review-routing.module';
import {AllReviewComponent} from './all-review/all-review.component';
import {AddReviewComponent} from './add-review/add-review.component';
import {BlogRoutingModule} from "../blog/blog-routing.module";
import {NgxDropzoneModule} from "ngx-dropzone";
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {MaterialModule} from "../../material/material.module";
import {DirectivesModule} from "../../shared/directives/directives.module";


@NgModule({
  declarations: [
    AllReviewComponent,
    AddReviewComponent
  ],
  imports: [
    CommonModule,
    ReviewRoutingModule,
    BlogRoutingModule,
    NgxDropzoneModule,
    FormsModule,
    NgxPaginationModule,
    MaterialModule,
    DirectivesModule,
  ]
})
export class ReviewModule {
}
