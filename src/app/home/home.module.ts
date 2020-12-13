import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';//reconocer directivas

import { HomeComponent } from './components/home/home.component';
import { BannerComponent } from './components/banner/banner.component';

import { HomeRoutingModule } from './home-routing.module'

@NgModule({
    declarations:[
        BannerComponent,
        HomeComponent,
    ],
    imports:[
        CommonModule,
        HomeRoutingModule
    ]
})
export class HomeModule { }
