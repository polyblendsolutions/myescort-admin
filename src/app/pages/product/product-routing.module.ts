import { AllProductComponent } from './all-product/all-product.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductSecondComponent } from './add-product-second/add-product-second.component';

const routes: Routes = [
  // {path:'add-product',component:AddProductComponent},
  // {path:'edit-product/:id',component:AddProductComponent},

  { path: 'add-product', component: AddProductSecondComponent },
  { path: 'edit-product/:id', component: AddProductSecondComponent },
  { path: 'all-product', component: AllProductComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
