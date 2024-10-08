import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { ChatbotService } from 'src/app/data/service/chatbot.service';
import { CompartidoFuncionesService } from 'src/app/data/service/compartido-funciones.service';
import { NotificationService } from 'src/app/data/service/notification.service';

@Component({
  selector: 'app-dialog-preguntas-frecuentes',
  templateUrl: './dialog-preguntas-frecuentes.component.html',
  styleUrls: ['./dialog-preguntas-frecuentes.component.scss']
})
export class DialogPreguntasFrecuentesComponent {
  listPreguntas: any[] = [
    {pregunta: '¿Como puedo cancelar mi plan de seguro de salud?'},
    {pregunta: '¿Qué planes de seguros de salud están disponibles?'}
  ];
  
  constructor(private notificationService                               : NotificationService,
              private _dialogRef                                        : DialogRef<any>,
              public serviciosCompartidos                               : CompartidoFuncionesService,
              public chatbotService                                     : ChatbotService) {

  }

  ngOnInit(){
    
  }

  selectPregunta(pregunta: string){
    this._dialogRef.close(pregunta);
  }

  onClose(){
    this._dialogRef.close();
  }
}
