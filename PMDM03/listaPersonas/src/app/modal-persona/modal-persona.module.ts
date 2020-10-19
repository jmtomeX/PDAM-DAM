import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalPersonaPageRoutingModule } from './modal-persona-routing.module';

import { ModalPersonaPage } from './modal-persona.page';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalPersonaPageRoutingModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [ModalPersonaPage]
})
export class ModalPersonaPageModule { }
