import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RequestRegisterAsesorNumero, RequestRegisterAsesorPregunta } from 'src/app/data/models/comunicacion-asesor.model';
import { CompartidoFuncionesService } from 'src/app/data/service/compartido-funciones.service';
import { ContactoAsesorService } from 'src/app/data/service/contacto-asesor.service';
import { NotificationService } from 'src/app/data/service/notification.service';
import { UserServiceService } from 'src/app/data/service/user-service.service';

@Component({
  selector: 'app-contact-with-administrator',
  templateUrl: './contact-with-administrator.component.html',
  styleUrls: ['./contact-with-administrator.component.scss']
})
export class ContactWithAdministratorComponent {
  waitDataSend: boolean = false;
  dataEnviada: boolean = false;

  tempSelectPag: any = Object();
  ctrlSelectPag = new FormControl(null);

  ctrlPregunta = new FormControl('', [Validators.required]);
  ctrlTelefono = new FormControl(null, [Validators.required]);

  listOpciones: any[] = [
    {idOpcion: 1, nombreBtn: 'Redactar Pregunta', nomTitulo: 'Redacte su pregunta'},
    {idOpcion: 2, nombreBtn: 'Vía Telefónica', nomTitulo: 'Vía telefónica'},
  ]

  constructor(public compartidoService      : CompartidoFuncionesService,
              private contactoService       : ContactoAsesorService,
              private _dialogRef            : DialogRef<any>,
              private notificationService   : NotificationService,){
              
  }

  ngOnInit(){
    this.ctrlSelectPag.valueChanges.subscribe((data)=>{
      this.tempSelectPag = data;
    })
  }
  
  checkValid(){
    if (this.dataEnviada) {
      this._dialogRef.close()
    }
    else{
      if (this.ctrlSelectPag.value == this.listOpciones[0]) {
        if (this.ctrlPregunta.valid) {
          this.waitDataSend = true;
          this.contactoService.registerPreguntaAsesor(this.getPayloadPregunta()).subscribe({
            next: (data)=>{
              this.dataEnviada = true;
              this.waitDataSend = false;
            },
            error: (error)=>{
              this.waitDataSend = false;
            }
          })
        }
        else{
          this.ctrlPregunta.markAllAsTouched();
        }
      }
      else{
        if (this.ctrlTelefono.valid) {
          this.waitDataSend = true;
          this.contactoService.registerNumeroaAsesor(this.getPayloadTelefono()).subscribe({
            next: (data)=>{
              this.dataEnviada = true;
              this.waitDataSend = false;
            },
            error: (error)=>{
              this.waitDataSend = false;
            }
          })
        }
        else{
          this.ctrlTelefono.markAllAsTouched();  
        }

      }
    }
  }
              
  close(){
    this._dialogRef.close()
  }

  getPayloadPregunta(): RequestRegisterAsesorPregunta {
    return {
      identification: JSON.parse(localStorage.getItem('usrChatbotSeguro')!).identification,
      ask: this.ctrlPregunta.value!,
    }
  }

  getPayloadTelefono(): RequestRegisterAsesorNumero {
    return {
      identification: JSON.parse(localStorage.getItem('usrChatbotSeguro')!).identification,
      phone: this.ctrlTelefono.value!,
    }
  }
}
