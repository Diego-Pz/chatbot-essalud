import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoute } from './data/constants/app-route.constant';

const routes: Routes = [
  {
   path: '',
   loadChildren: () =>
     import('./pages/auth-user/auth-user.module').then((m) => m.AuthUserModule),
 },
 {
   path: AppRoute.DIRECCION_MONITOREO,
   loadChildren: () =>
     import('./pages/administracion/administracion.module').then((m) => m.AdministracionModule),
 },
 { 
   path: '**',
   pathMatch: 'full',
   redirectTo: '',
 },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
