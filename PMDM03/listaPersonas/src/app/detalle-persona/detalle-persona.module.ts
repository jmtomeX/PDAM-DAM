import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallePersonaPageRoutingModule } from './detalle-persona-routing.module';

import { DetallePersonaPage } from './detalle-persona.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallePersonaPageRoutingModule
  ],
  declarations: [DetallePersonaPage]
})
export class DetallePersonaPageModule {}
