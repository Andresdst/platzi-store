import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component'
import { ContactComponent } from './contact/contact.component'
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductDetailComponent } from './product-detail/product-detail.component'
import { LayoutComponent } from './layout/layout.component';


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
      component: ProductsComponent,
      },
      {
      path: 'products/:id',
      component: ProductDetailComponent,
      },
      {
      path: 'contact',
      component: ContactComponent,
      },
    ]
  },

  {
  path:'**',
  component: NotFoundComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
