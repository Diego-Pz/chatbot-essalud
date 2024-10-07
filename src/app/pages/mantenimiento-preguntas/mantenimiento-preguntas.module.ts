import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MantenimientoPreguntasRoutingModule } from './mantenimiento-preguntas-routing.module';
import { MantenimientoPreguntasComponent } from './mantenimiento-preguntas/mantenimiento-preguntas.component';


@NgModule({
  declarations: [
    MantenimientoPreguntasComponent
  ],
  imports: [
    CommonModule,
    MantenimientoPreguntasRoutingModule
  ]
})
export class MantenimientoPreguntasModule { }
