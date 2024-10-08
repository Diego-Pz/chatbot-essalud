import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MantenimientoMetricasComponent } from './mantenimiento-metricas/mantenimiento-metricas.component';

const routes: Routes = [
  {
    path: '',
    component: MantenimientoMetricasComponent,
    title: 'Métricas de la Aplicación'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantenimientoMetricasRoutingModule { }
