import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MantenimientoBandejaRoutingModule } from './mantenimiento-bandeja-routing.module';
import { MantenimientoBandejaComponent } from './mantenimiento-bandeja/mantenimiento-bandeja.component';


@NgModule({
  declarations: [
    MantenimientoBandejaComponent
  ],
  imports: [
    CommonModule,
    MantenimientoBandejaRoutingModule
  ]
})
export class MantenimientoBandejaModule { }
