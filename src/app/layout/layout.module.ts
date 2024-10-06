import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LayoutComponent } from './layout.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { CdkMenuModule } from '@angular/cdk/menu';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateDataUserComponent } from './toolbar/update-data-user/update-data-user.component';
import { AddContratoUserComponent } from './sidenav/add-contrato-user/add-contrato-user.component';
import { ContactWithAdministratorComponent } from './sidenav/contact-with-administrator/contact-with-administrator.component';
import { DialogValoracionComponent } from './sidenav/dialog-valoracion/dialog-valoracion.component';


@NgModule({
  declarations: [
    SidenavComponent,
    ToolbarComponent,
    LayoutComponent,
    UpdateDataUserComponent,
    AddContratoUserComponent,
    ContactWithAdministratorComponent,
    DialogValoracionComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    ReactiveFormsModule,
    CdkMenuModule,
    MaterialModule,
    SharedModule
  ]
})
export class LayoutModule { }
