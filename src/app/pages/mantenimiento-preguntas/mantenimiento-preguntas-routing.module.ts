import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MantenimientoPreguntasComponent } from './mantenimiento-preguntas/mantenimiento-preguntas.component';

const routes: Routes = [
  {
    path: '',
    component: MantenimientoPreguntasComponent,
    title: 'Administración de Preguntas'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantenimientoPreguntasRoutingModule { }
