import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { authUsernGuard } from '../data/guards/auth-user.guard';
import { authManagementGuard } from '../data/guards/auth-management.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./../pages/chatbot/chatbot.module').then((m) => m.ChatbotModule),
      },
      {
        path: 'administracion-usuario',
        canActivate: [authUsernGuard, authManagementGuard],
        loadChildren: () =>
          import('./../pages/mantenimiento-usuario/mantenimiento-usuario.module').then((m) => m.MantenimientoUsuarioModule),
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
