import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { RequestEditInfoUser, RequestFindUser } from 'src/app/data/models/user.model';
import { CompartidoFuncionesService } from 'src/app/data/service/compartido-funciones.service';
import { NotificationService } from 'src/app/data/service/notification.service';
import { UserServiceService } from 'src/app/data/service/user-service.service';
import { DialogConfirmacionComponent } from '../../chatbot/components/dialog-confirmacion/dialog-confirmacion.component';

@Component({
  selector: 'app-mantenimiento-usuario',
  templateUrl: './mantenimiento-usuario.component.html',
  styleUrls: ['./mantenimiento-usuario.component.scss']
})
export class MantenimientoUsuarioComponent {
  waitList: boolean[] = [false, false, false];

  showPass = false;
  formPreSearch = this._formBuilder.group({
    ctrlPreSearch: ['', Validators.required]
  })
  formUpdateUser = this._formBuilder.group({
    ctrlTypeDoc: ['', Validators.required],
    ctrlDoc: ['', Validators.required],
    ctrlTypeSec: ['', Validators.required],
    ctrlCorreo: ['', [Validators.required, Validators.email]],
    ctrlPass: [''],
  });

  constructor(public compartidoService      : CompartidoFuncionesService,
              private userService           : UserServiceService,
              private dialog                : Dialog,
              private notificationService   : NotificationService,
              private _formBuilder          : FormBuilder,){

  }

  ngOnInit(){
    this.formUpdateUser.controls.ctrlDoc.disable();
  }

  findUser(){
    if (this.formPreSearch.valid) {
      this.waitList[0] = true;
      this.userService.getUserInfo(this.getPayloadPreSearch()).subscribe({
        next: (data)=>{
          this.formUpdateUser.controls.ctrlTypeDoc.setValue(data.document_type);
          this.formUpdateUser.controls.ctrlTypeDoc.disable();
          this.formUpdateUser.controls.ctrlDoc.setValue(data.identification);
          this.formUpdateUser.controls.ctrlTypeSec.setValue(data.insurance_type);
          this.formUpdateUser.controls.ctrlCorreo.setValue(data.email);
          
          this.waitList[0] = false;
          this.waitList[2] = true;
          this.formPreSearch.reset();
          this.notificationService.success('Usuario encontrado')
        },
        error: (error)=>{
          this.waitList[0] = false;
          this.notificationService.warning(error.error.detail);
        }
      })
    }
    else{
      this.formPreSearch.markAllAsTouched();
    }
  }

  updateDataUser(){
    if (this.formUpdateUser.valid) {
      const dialogRef = this.dialog.open(DialogConfirmacionComponent,{
        data:{
          titulo: '¿Desea realizar estos cambios?',
          subText: 'Se notificará los cambios realizados al correo del usuario',
          type: 1
        }
      })
  
      dialogRef.closed.subscribe(result => {
        if (result == 1) {
          this.waitList[1] = true;
          this.userService.editInfoUser(this.getPayloadUpdate()).subscribe({
            next: (data)=>{
              this.notificationService.success('Cambio registrado en usuario');
              this.formUpdateUser.reset();
              this.waitList[1] = false;
              this.waitList[2] = false;
            },
            error: (error)=>{
              this.waitList[1] = false;
              this.notificationService.warning(error.error.error);
            }        
          })
        }
      });
    }
    else{
      this.formUpdateUser.markAllAsTouched();
    }
  }

  getPayloadPreSearch(): RequestFindUser{
    return {
      identification: this.formPreSearch.controls.ctrlPreSearch.value!
    }
  }

  getPayloadUpdate(): RequestEditInfoUser{
    let payload: RequestEditInfoUser = {
      identification: this.formUpdateUser.controls.ctrlDoc.value!,
      insurance_type: parseInt(this.formUpdateUser.controls.ctrlTypeSec.value!),
      email: this.formUpdateUser.controls.ctrlCorreo.value!
    }

    if (this.formUpdateUser.controls.ctrlPass.value) {
      payload.password = this.formUpdateUser.controls.ctrlPass.value;
    }

    return payload;
  }
}
