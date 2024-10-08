import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MantenimientoPreguntasRoutingModule } from './mantenimiento-preguntas-routing.module';
import { MantenimientoPreguntasComponent } from './mantenimiento-preguntas/mantenimiento-preguntas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MantenimientoPreguntasComponent
  ],
  imports: [
    CommonModule,
    MantenimientoPreguntasRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class MantenimientoPreguntasModule { }
