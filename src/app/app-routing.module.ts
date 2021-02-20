import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { LayoutComponent } from './layout/layout.component';

import {AdminGuard} from './admin.guard'

const routes: Routes = [
  {
    path:'',
    component: LayoutComponent,
    children: [
      {
        path:'',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(loaded => loaded.HomeModule)
        //component: HomeComponent,
      },
      {
        path: 'products',
        loadChildren: () => import('./product/product.module').then(loaded => loaded.ProductModule)
        //component: ProductsComponent,
      },
      {
        path: 'products/:id',
        loadChildren: () => import('./product/product.module').then(loaded => loaded.ProductModule)
        //component: ProductDetailComponent,
      },
      {
        path: 'contact',
        canActivate:[AdminGuard],
        loadChildren: () => import('./contact/contact.module').then(loaded => loaded.ContactModule)
        //component: ContactComponent,
      },
      {
        path: 'order',
        loadChildren: () => import('./order/order.module').then(loaded => loaded.OrderModule)
      },
    ]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(loaded => loaded.AdminModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(loaded => loaded.AuthModule)
  },
  {
    path:'**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy: PreloadAllModules,//estrategia de precarga
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
