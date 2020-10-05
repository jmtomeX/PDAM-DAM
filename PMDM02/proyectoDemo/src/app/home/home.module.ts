import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { MayusculasPipe } from '../pipes/mayusculas.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule, FormsModule, ReactiveFormsModule
  ],
  declarations: [HomePage, MayusculasPipe]
})
export class HomePageModule { }
