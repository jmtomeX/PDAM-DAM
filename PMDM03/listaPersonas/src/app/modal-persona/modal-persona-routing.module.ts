import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalPersonaPage } from './modal-persona.page';

const routes: Routes = [
  {
    path: '',
    component: ModalPersonaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalPersonaPageRoutingModule {}
