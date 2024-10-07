import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MantenimientoMetricasRoutingModule } from './mantenimiento-metricas-routing.module';
import { MantenimientoMetricasComponent } from './mantenimiento-metricas/mantenimiento-metricas.component';


@NgModule({
  declarations: [
    MantenimientoMetricasComponent
  ],
  imports: [
    CommonModule,
    MantenimientoMetricasRoutingModule
  ]
})
export class MantenimientoMetricasModule { }
