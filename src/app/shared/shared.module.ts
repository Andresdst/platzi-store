import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { MaterialModule } from '../material/material.module'

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    RouterModule
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
  ]
})
export class SharedModule { }
