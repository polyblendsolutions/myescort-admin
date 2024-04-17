import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CheckAuthAccessGuard} from '../auth-guard/check-auth-access.guard';
import {PagesComponent} from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [CheckAuthAccessGuard]
      },

      {
        path: 'gallery',
        loadChildren: () => import('./gallery/gallery.module').then(m => m.GalleryModule),
        // canActivate: [CheckAuthAccessGuard],
      },

      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
      },
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
      },

      {
        path: 'catalog',
        loadChildren: () => import('./catalog/catalog.module').then(m => m.CatalogModule),
      },
      {
        path: 'admin-control',
        loadChildren: () => import('./admin-control/admin-control.module').then(m => m.AdminControlModule),
        // canActivate: [CheckAuthAccessGuard]
      },
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
      },
      {
        path: 'blog',
        loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule),
      },
      {
        path: 'sales',
        loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule),
      },
      {
        path: 'contact',
        loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule),
      },
      {
        path: 'review',
        loadChildren: () => import('./review/review.module').then(m => m.ReviewModule),
      },
      {
        path: 'report',
        loadChildren: () => import('./report/report.module').then(m => m.ReportModule),
      },
      {
        path: 'offer',
        loadChildren: () => import('./offer/offer.module').then(m => m.OfferModule),
      },
      {
        path: 'discount-percent',
        loadChildren: () => import('./discount-percent/discount-percent.module').then(m => m.DiscountPercentModule),
      },
      {
        path: 'verification',
        loadChildren: () => import('./verification/verification.module').then(m => m.VerificationModule),
      },
      {
        path: 'additionl-page',
        loadChildren: () => import('./additionl-page/additionl-page.module').then(m => m.AdditionlPageModule),
      },
      {
        path:"address",
        loadChildren:() => import('./address/address.module').then(m => m.AddressModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PagesRoutingModule {
}
