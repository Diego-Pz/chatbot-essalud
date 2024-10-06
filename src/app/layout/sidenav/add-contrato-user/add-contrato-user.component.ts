import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CompartidoFuncionesService } from 'src/app/data/service/compartido-funciones.service';
import { NotificationService } from 'src/app/data/service/notification.service';
import { UserServiceService } from 'src/app/data/service/user-service.service';

@Component({
  selector: 'app-add-contrato-user',
  templateUrl: './add-contrato-user.component.html',
  styleUrls: ['./add-contrato-user.component.scss']
})
export class AddContratoUserComponent {
  waitDataSend: boolean = false;

  ctrlTipoSeguro = new FormControl(null, [Validators.required]);


  constructor(public compartidoService      : CompartidoFuncionesService,
              private userService           : UserServiceService,
              private _dialogRef            : DialogRef<any>,
              private notificationService   : NotificationService,){
              
  }
  
  checkValid(){
    if (this.ctrlTipoSeguro.valid) {
      this.waitDataSend = true;
      this._dialogRef.close(1)
      this.notificationService.success('Se añadio el documento elegido a su bandeja');
      this.waitDataSend = false;
    }
  }
              
  close(){
    this._dialogRef.close()
  }
}
