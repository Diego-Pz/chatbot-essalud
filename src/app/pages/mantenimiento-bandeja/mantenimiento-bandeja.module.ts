import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MantenimientoBandejaRoutingModule } from './mantenimiento-bandeja-routing.module';
import { MantenimientoBandejaComponent } from './mantenimiento-bandeja/mantenimiento-bandeja.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ResponderPreguntaComponent } from './mantenimiento-bandeja/responder-pregunta/responder-pregunta.component';


@NgModule({
  declarations: [
    MantenimientoBandejaComponent,
    ResponderPreguntaComponent
  ],
  imports: [
    CommonModule,
    MantenimientoBandejaRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class MantenimientoBandejaModule { }
