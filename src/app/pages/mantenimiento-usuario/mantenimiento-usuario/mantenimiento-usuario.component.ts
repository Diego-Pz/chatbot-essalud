import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { RequestEditInfoUser, RequestFindUser } from 'src/app/data/models/user.model';
import { CompartidoFuncionesService } from 'src/app/data/service/compartido-funciones.service';
import { NotificationService } from 'src/app/data/service/notification.service';
import { UserServiceService } from 'src/app/data/service/user-service.service';

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
              private notificationService   : NotificationService,
              private _formBuilder          : FormBuilder,){

  }

  ngOnInit(){
    
  }

  findUser(){
    if (this.formPreSearch.valid) {
      this.waitList[0] = true;
      this.userService.getUserInfo(this.getPayloadPreSearch()).subscribe({
        next: (data)=>{
          this.formUpdateUser.controls.ctrlTypeDoc.setValue(data.document_type);
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
      this.waitList[1] = true;
      this.userService.editInfoUser(this.getPayloadUpdate()).subscribe({
        next: (data)=>{
          this.notificationService.success('Cambio registrado en usuario')
          this.waitList[1] = false;          
        },
        error: (error)=>{
          this.waitList[1] = false;
          this.notificationService.warning(error.error.error);
        }        
      })
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
