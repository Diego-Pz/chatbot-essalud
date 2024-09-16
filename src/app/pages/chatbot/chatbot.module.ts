import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatbotRoutingModule } from './chatbot-routing.module';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogPreguntasFrecuentesComponent } from './components/dialog-preguntas-frecuentes/dialog-preguntas-frecuentes.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ChatbotComponent,
    DialogPreguntasFrecuentesComponent
  ],
  imports: [
    CommonModule,
    ChatbotRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ChatbotModule { }
