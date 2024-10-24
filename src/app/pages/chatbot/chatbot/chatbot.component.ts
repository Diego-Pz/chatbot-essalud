import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { RequestComunicacionChatbot, RequestComunicacionChatbotRNN, StructureInteraccionChatbot } from 'src/app/data/models/chatbot.model';
import { ChatbotService } from 'src/app/data/service/chatbot.service';
import { NotificationService } from 'src/app/data/service/notification.service';
import { DialogPreguntasFrecuentesComponent } from '../components/dialog-preguntas-frecuentes/dialog-preguntas-frecuentes.component';
import { Dialog } from '@angular/cdk/dialog';
import { AuthUserService } from 'src/app/data/service/auth-user.service';
import { CompartidoFuncionesService } from 'src/app/data/service/compartido-funciones.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  formPregunta = this._formBuilder.group({
    ctrlPregunta: ['', Validators.required],
  });

  dataReady: boolean = true;
  listRespuestas: StructureInteraccionChatbot[] = [];

  constructor(private chatbotService                      : ChatbotService,
              private notificationService                 : NotificationService,
              private authService                         : AuthUserService,
              private dialog                              : Dialog,
              public compartidoService                    : CompartidoFuncionesService,
              private _formBuilder                        : FormBuilder
  ){
    
  }

  ngOnInit(){
    
  }

  ngAfterViewChecked(){
    this.scrollToBottom();
  }

  sendPregunta(){
    if (this.formPregunta.valid && this.dataReady) {
      this.dataReady = false;
      let payload = this.getPayloadPregunta();
      this.listRespuestas.push({rol: 'usuario', interaccion: this.formPregunta.controls.ctrlPregunta.value!, respuestaRealizada: true})
      this.formPregunta.reset()
      this.listRespuestas.push({rol: 'system', interaccion: '', respuestaRealizada: false})
      this.chatbotService.realizarConsulta(payload).then((data)=>{
        if (data.code == 200) {
          this.listRespuestas[this.listRespuestas.length - 1].interaccion = data.response;
          this.listRespuestas[this.listRespuestas.length - 1].respuestaRealizada = true;
          this.dataReady = true;
        }
        else{
          this.notificationService.warning(data.response);
          this.dataReady = true;
        }
        this.dataReady = true;
    })
    }
    else{
      this.notificationService.warning('Ingrese su pregunta');
      this.dataReady = true;
    }
  }

  sendPreguntaRNN(){
    if (this.formPregunta.valid && this.dataReady) {
      this.dataReady = false;
      let payload = this.getPayloadRNN();
      this.listRespuestas.push({rol: 'usuario', interaccion: this.formPregunta.controls.ctrlPregunta.value!, respuestaRealizada: true})
      this.formPregunta.reset()
      this.listRespuestas.push({rol: 'system', interaccion: '', respuestaRealizada: false})
      this.chatbotService.realizarConsultaRNN(payload).subscribe({
        next: (data)=>{
          this.listRespuestas[this.listRespuestas.length - 1].interaccion = data.respuesta;
          this.listRespuestas[this.listRespuestas.length - 1].respuestaRealizada = true;
          this.dataReady = true;
        },
        error: (error)=>{
          this.dataReady = false;
          this.notificationService.warning(error.error.error);
        }

      })
    }
    else{
      this.notificationService.warning('Ingrese su pregunta');
      this.dataReady = true;
    }
  }

  getPayloadPregunta(): RequestComunicacionChatbot{
    let payload: RequestComunicacionChatbot = {
      question: this.formPregunta.controls.ctrlPregunta.value!
    }

    if (this.authService.isAuthenticated()) {
      payload.identification = JSON.parse(localStorage.getItem('usrChatbotSeguro')!).identification;
    }

    return payload;
  }

  getPayloadRNN(): RequestComunicacionChatbotRNN {
    return {
      pregunta: this.formPregunta.controls.ctrlPregunta.value!
    }
  }

  private scrollToBottom(): void {
    const container = this.chatContainer.nativeElement;
    container.scrollTop = container.scrollHeight;
  }

  openDialogPreguntasFrecuentes(){
    const dialogRef = this.dialog.open(DialogPreguntasFrecuentesComponent,{
      width: '80%',
      maxWidth: '1086px',
      maxHeight: '90%',
    })
    dialogRef.closed.subscribe((data: any) =>{
      if (data) {
        this.formPregunta.controls.ctrlPregunta.setValue(data)
        this.sendPreguntaRNN()
      }
    })
  }
}
