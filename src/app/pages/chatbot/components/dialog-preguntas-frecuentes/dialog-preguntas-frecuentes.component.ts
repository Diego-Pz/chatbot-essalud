import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { ChatbotService } from 'src/app/data/service/chatbot.service';
import { CompartidoFuncionesService } from 'src/app/data/service/compartido-funciones.service';
import { NotificationService } from 'src/app/data/service/notification.service';
import { PreguntasFrecuentesService } from 'src/app/data/service/preguntas-frecuentes.service';

@Component({
  selector: 'app-dialog-preguntas-frecuentes',
  templateUrl: './dialog-preguntas-frecuentes.component.html',
  styleUrls: ['./dialog-preguntas-frecuentes.component.scss']
})
export class DialogPreguntasFrecuentesComponent {

  listPreguntas: any[] = [];
  waitList: boolean = false;
  
  constructor(private notificationService                               : NotificationService,
              private _dialogRef                                        : DialogRef<any>,
              public serviciosCompartidos                               : CompartidoFuncionesService,
              public preguntaServicio                                   : PreguntasFrecuentesService,
              public chatbotService                                     : ChatbotService) {

  }

  ngOnInit(){
    this.getPreguntas();
  }

  getPreguntas(){
    this.waitList = false;
    this.preguntaServicio.getPreguntasFrecuentes().subscribe({
      next: (data)=>{
        this.listPreguntas = data.data;
        this.waitList = true;
      },
      error: (error)=>{
        this.notificationService.warning(error.error.error);
        this.waitList = true;
      }
    })
  }

  selectPregunta(pregunta: string){
    this._dialogRef.close(pregunta);
  }

  onClose(){
    this._dialogRef.close();
  }
}
