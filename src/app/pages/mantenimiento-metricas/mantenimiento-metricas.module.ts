import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MantenimientoMetricasRoutingModule } from './mantenimiento-metricas-routing.module';
import { MantenimientoMetricasComponent } from './mantenimiento-metricas/mantenimiento-metricas.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MantenimientoMetricasComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MantenimientoMetricasRoutingModule,
    NgApexchartsModule,
  ]
})
export class MantenimientoMetricasModule { }
