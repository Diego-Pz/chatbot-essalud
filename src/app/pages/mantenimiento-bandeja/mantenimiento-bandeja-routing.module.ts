import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MantenimientoBandejaComponent } from './mantenimiento-bandeja/mantenimiento-bandeja.component';

const routes: Routes = [
  {
    path: '',
    component: MantenimientoBandejaComponent,
    title: 'Administración de Preguntas directas'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantenimientoBandejaRoutingModule { }
