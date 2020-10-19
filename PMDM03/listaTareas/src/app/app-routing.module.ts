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
    path: 'modal-task',
    loadChildren: () => import('./pages/modal-task/modal-task.module').then( m => m.ModalTaskPageModule)
  },
  {
    path: 'modal-task/:idTask',
    loadChildren: () => import('./pages/modal-task/modal-task.module').then( m => m.ModalTaskPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
