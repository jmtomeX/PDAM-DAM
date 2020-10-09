import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalTaskPageRoutingModule } from './modal-task-routing.module';

import { ModalTaskPage } from './modal-task.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalTaskPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ModalTaskPage]
})
export class ModalTaskPageModule {}
