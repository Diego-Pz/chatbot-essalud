import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MantenimientoUsuarioRoutingModule } from './mantenimiento-usuario-routing.module';
import { MantenimientoUsuarioComponent } from './mantenimiento-usuario/mantenimiento-usuario.component';
import { DialogConfirmacionComponent } from './mantenimiento-usuario/dialog-confirmacion/dialog-confirmacion.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MantenimientoUsuarioComponent,
    DialogConfirmacionComponent
  ],
  imports: [
    CommonModule,
    MantenimientoUsuarioRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class MantenimientoUsuarioModule { }
