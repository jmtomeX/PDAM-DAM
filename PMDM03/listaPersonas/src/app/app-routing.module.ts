import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'detalle-persona/:myId',
    loadChildren: () => import('./detalle-persona/detalle-persona.module').then( m => m.DetallePersonaPageModule)
  },
  {
    path: 'modal-persona',
    loadChildren: () => import('./modal-persona/modal-persona.module').then( m => m.ModalPersonaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
