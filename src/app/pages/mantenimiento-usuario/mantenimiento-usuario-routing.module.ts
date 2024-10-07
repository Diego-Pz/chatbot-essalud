import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MantenimientoUsuarioComponent } from './mantenimiento-usuario/mantenimiento-usuario.component';

const routes: Routes = [
  {
    path: '',
    component: MantenimientoUsuarioComponent,
    title: 'Administración de Usuarios'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantenimientoUsuarioRoutingModule { }
