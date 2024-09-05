import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnComponent } from './components/btn/btn.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconComponent } from './components/icon/icon.component';
import { CdkMenuModule } from '@angular/cdk/menu';
import { FormsModule } from '@angular/forms';

const components: any[] = [
  BtnComponent,
  IconComponent
]

@NgModule({
  declarations: [
    components
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    CdkMenuModule,
    FormsModule
  ],
  exports: [
    components
  ]
})
export class SharedModule { }
