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


@NgModule({
  declarations: [
    SidenavComponent,
    ToolbarComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    CdkMenuModule,
    MaterialModule,
    SharedModule
  ]
})
export class LayoutModule { }
