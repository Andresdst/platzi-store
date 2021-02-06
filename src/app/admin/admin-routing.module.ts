import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductFormComponent } from '../admin/components/product-form/product-form.component'
import { NavComponent } from '../admin/components/nav/nav.component'
import { ProductListComponent } from './components/product-list/product-list.component';

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children:[
      {
        path: 'create',
        component: ProductFormComponent,
      },
      {
        path: 'products',
        component: ProductListComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
