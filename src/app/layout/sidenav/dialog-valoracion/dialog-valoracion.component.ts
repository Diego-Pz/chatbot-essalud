import { DialogRef } from '@angular/cdk/dialog';
import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RegisterOpinion } from 'src/app/data/models/calificacion.model';
import { ChatbotService } from 'src/app/data/service/chatbot.service';
import { CompartidoFuncionesService } from 'src/app/data/service/compartido-funciones.service';
import { NotificationService } from 'src/app/data/service/notification.service';
import { UserServiceService } from 'src/app/data/service/user-service.service';

@Component({
  selector: 'app-dialog-valoracion',
  templateUrl: './dialog-valoracion.component.html',
  styleUrls: ['./dialog-valoracion.component.scss']
})
export class DialogValoracionComponent {
  waitDataSend: boolean = false;

  opcionesEstrella: boolean[] = [false, false, false, false, false];
  ctrlStars = new FormControl(0, [Validators.required]);
  ctrlDescripcion = new FormControl(null, [Validators.required]);


  constructor(public compartidoService            : CompartidoFuncionesService,
              private _dialogRef                  : DialogRef<any>,
              @Inject(LOCALE_ID) private locale   : string,
              private chatbotService              : ChatbotService,
              private notificationService         : NotificationService,){
              
  }

  ngOnInit(){
    this.ctrlStars.valueChanges.subscribe((data)=>{
      this.opcionesEstrella.fill(false);
      this.opcionesEstrella.forEach((x, index)=>{
        if (index < data!) {
          this.opcionesEstrella[index] = true;
        }
      })
    })
  }
  
  checkValid(){
    if ((this.ctrlStars.value! > 0) && this.ctrlDescripcion.valid) {
      this.waitDataSend = true;
      this.chatbotService.registerOpinion(this.getPayload()).subscribe({
        next: (data)=>{
          this._dialogRef.close(1)
          this.notificationService.success('Se registró su opinión');
          this.waitDataSend = false;
        },
        error: (error)=>{
          this.notificationService.warning(error.error.error);
          this.waitDataSend = false;
        }
      })
    }
    else{
      this.ctrlDescripcion.markAllAsTouched();
      this.ctrlStars.markAllAsTouched();
    }
  }
              
  close(){
    this._dialogRef.close()
  }

  getPayload(): RegisterOpinion{
    let payload: RegisterOpinion = {
      ranking: this.ctrlStars.value!,
      observation: this.ctrlDescripcion.value!,
      date: formatDate(new Date(), 'yyyy-MM-dd', this.locale)
    }
    if (JSON.parse(localStorage.getItem('usrChatbotSeguro')!)) {
      payload.identification = JSON.parse(localStorage.getItem('usrChatbotSeguro')!).identification;
    }
    return payload;
  }
}
