import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RequestModifyAnswer } from 'src/app/data/models/bandeja-pregunta.molde';
import { RequestRegisterNotification } from 'src/app/data/models/notificaciones.model';
import { BandejaPreguntaService } from 'src/app/data/service/bandeja-pregunta.service';
import { CompartidoFuncionesService } from 'src/app/data/service/compartido-funciones.service';
import { NotificacionesUserService } from 'src/app/data/service/notificaciones-user.service';
import { NotificationService } from 'src/app/data/service/notification.service';

@Component({
  selector: 'app-responder-pregunta',
  templateUrl: './responder-pregunta.component.html',
  styleUrls: ['./responder-pregunta.component.scss']
})
export class ResponderPreguntaComponent {
  waitSend = false;
  ctrlRespuesta = new FormControl('', [Validators.required]);
  
  constructor(private notificationService                               : NotificationService,
              @Inject(DIALOG_DATA) public data                          : any,
              private _dialogRef                                        : DialogRef<any>,
              public serviciosCompartidos                               : CompartidoFuncionesService,
              private notiUser                                          : NotificacionesUserService,
              private preguntaService                                   : BandejaPreguntaService,) {

  }

  ngOnInit(){
    console.log(this.data)
  }
  
  sendData(){
    let confirmacion = false;
    if (this.data.phone) {
      confirmacion = true;
    }
    else{
      if (this.ctrlRespuesta.valid) {
        confirmacion = true;
      }
      else{
        this.ctrlRespuesta.markAllAsTouched();
      }
    }

    if (confirmacion) {
      this.waitSend = true;
      this.preguntaService.responderPregunta(this.getPayload()).subscribe({
        next: (data)=>{
          this.notiUser.registerNotificacion(this.getPayloadNotificacion()).subscribe({
            next: (datos)=>{
              this._dialogRef.close(1);
              this.notificationService.success('¡Se registró su respuesta y fue notificada al usuario!')
              this.waitSend = false;
            },
            error: (error)=>{
              this.notificationService.warning(error.error.error);
              this.waitSend = false;
            }
          })
          
        },
        error: (error)=>{
          this.waitSend = false;
        }
      })
    }
  }

  onClose(){
    this._dialogRef.close();
  }

  getPayload(): RequestModifyAnswer{
    let respuesta: string;

    if (this.data.phone) {
      respuesta = 'Atendido';
    }
    else{
      respuesta = this.ctrlRespuesta.value!;
    }

    return {
      idComment: this.data.id,
      ask: respuesta
    };
  }

  getPayloadNotificacion(): RequestRegisterNotification{
    let respuesta: string;

    if (this.data.phone) {
      respuesta = 'Se atendió por medio telefónico a su consulta';
    }
    else{
      respuesta = `Con respecto a su pregunta '${this.data.ask}' se le comunica lo siguiente: '${this.ctrlRespuesta.value!}'`;
    }

    return {
      message: respuesta,
      identification: this.data.identification,
      type: 2,
    }
  }
}
