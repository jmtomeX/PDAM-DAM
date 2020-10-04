import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallePersonaPage } from './detalle-persona.page';

const routes: Routes = [
  {
    path: '',
    component: DetallePersonaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallePersonaPageRoutingModule {}
