import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { RequestEditInfoUser } from 'src/app/data/models/user.model';
import { CompartidoFuncionesService } from 'src/app/data/service/compartido-funciones.service';
import { NotificationService } from 'src/app/data/service/notification.service';
import { UserServiceService } from 'src/app/data/service/user-service.service';

@Component({
  selector: 'app-update-data-user',
  templateUrl: './update-data-user.component.html',
  styleUrls: ['./update-data-user.component.scss']
})
export class UpdateDataUserComponent {
  userData = JSON.parse(localStorage.getItem('usrChatbotSeguro')!);
  infoUser = Object();
  wait: boolean = false;
  tempSelectPag: any = Object();
  ctrlSelectPag = new FormControl(null);

  ctrlTipoSeguro = new FormControl(null, [Validators.required]);
  ctrlEmail = new FormControl('', [Validators.email, Validators.required]);
  ctrlEmailConfirmacion = new FormControl('')
  
  showPass = [false, false, false];
  formChangePass = this._formBuilder.group({
    ctrlActualPsss: ['', Validators.required],
    ctrlNewPass: ['', Validators.required],
    ctrlConfirmNewPass: ['', Validators.required],
  });

  listOpciones: any[] = [
    {idOpcion: 1, nombreBtn: 'Tipo de Seguro', nomTitulo: 'Actualizar Tipo de Seguro'},
    {idOpcion: 2, nombreBtn: 'Contraseña', nomTitulo: 'Actualizar Contraseña'},
    {idOpcion: 3, nombreBtn: 'Correo Electrónico', nomTitulo: 'Actualizar Correo Electrónico'},
  ] 

  constructor(public compartidoService      : CompartidoFuncionesService,
              private userService           : UserServiceService,
              private _dialogRef            : DialogRef<any>,
              private notificationService   : NotificationService,
              private _formBuilder          : FormBuilder,){}

  ngOnInit(){
    this.userService.getUserInfo({identification: this.userData.identification}).subscribe({
      next: (data)=>{
        console.log(data)
        this.ctrlTipoSeguro.setValue(data.insurance_type)
      },
      error: (error)=>{
        this.notificationService.warning(error.error.detail);
      }
    })
    this.ctrlSelectPag.valueChanges.subscribe((data)=>{
      this.tempSelectPag = data;
    })
  }

  updateValues(){
    let pasoValidacion = false;
    switch (this.ctrlSelectPag.value) {
      case this.listOpciones[0]:
        if (this.ctrlTipoSeguro.valid){
          pasoValidacion = true;
        }
        else{
          this.ctrlTipoSeguro.markAllAsTouched();
        }
        break;
      case this.listOpciones[1]:
        if (this.formChangePass.valid && (this.formChangePass.controls.ctrlNewPass.value === this.formChangePass.controls.ctrlConfirmNewPass.value)){
          pasoValidacion = true;
        }
        else{
          this.formChangePass.markAllAsTouched();
        }
        break;
      case this.listOpciones[2]:
        if (this.ctrlEmail.valid && (this.ctrlEmail.value == this.ctrlEmailConfirmacion.value)){
          pasoValidacion = true;
        }
        else{
          this.ctrlEmail.markAllAsTouched();
        }
        break;
    }

    if (pasoValidacion) {
      this.wait = true;
      this.userService.editInfoUser(this.getPayload()).subscribe({
        next: (data)=>{
          switch (this.ctrlSelectPag.value) {
            case this.listOpciones[0]:
              this.notificationService.success('Se registró el tipo de seguro correctamente');
              break;
            case this.listOpciones[1]:
              this.notificationService.success('Se actualizó la contraseña correctamente');
              break;
            case this.listOpciones[2]:
              this.notificationService.success('Se actualizó el correo electrónico correctamente');
              break;
          }
          this.wait = false;
          this._dialogRef.close();
        },
        error: (error)=>{
          this.wait = false;
          this.notificationService.warning(error.error.error);
        }
      })
    }
  }

  getPayload(): RequestEditInfoUser{
    let payload: RequestEditInfoUser = {
      identification: JSON.parse(localStorage.getItem('usrChatbotSeguro')!).identification
    };

    switch (this.ctrlSelectPag.value) {
      case this.listOpciones[0]:
        payload.insurance_type = this.ctrlTipoSeguro.value!;
        break;
      case this.listOpciones[1]:
        payload.password = this.formChangePass.controls.ctrlNewPass.value!;
        break;
      case this.listOpciones[2]:
        payload.email = this.ctrlEmail.value!;
        break;
    }

    return payload;
  }
}
