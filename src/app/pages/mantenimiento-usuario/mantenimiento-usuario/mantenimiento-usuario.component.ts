import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { RequestFindUser } from 'src/app/data/models/user.model';
import { CompartidoFuncionesService } from 'src/app/data/service/compartido-funciones.service';
import { NotificationService } from 'src/app/data/service/notification.service';
import { UserServiceService } from 'src/app/data/service/user-service.service';

@Component({
  selector: 'app-mantenimiento-usuario',
  templateUrl: './mantenimiento-usuario.component.html',
  styleUrls: ['./mantenimiento-usuario.component.scss']
})
export class MantenimientoUsuarioComponent {
  waitList: boolean[] = [false, false];
  ctrlPreSearch = new FormControl('72437355', [Validators.required]);
  formUpdateUser = this._formBuilder.group({
    ctrlTypeDoc: ['', Validators.required],
    ctrlDoc: ['', Validators.required],
    ctrlTypeSec: ['', Validators.required],
    ctrlCorreo: ['', Validators.required],
    ctrlPass: ['', Validators.required],
  });

  constructor(public compartidoService      : CompartidoFuncionesService,
              private userService           : UserServiceService,
              private notificationService   : NotificationService,
              private _formBuilder          : FormBuilder,){

  }

  ngOnInit(){
    this.findUser()
  }

  findUser(){
    if (this.ctrlPreSearch.valid) {
      this.waitList[0] = true;
      this.userService.getUserInfo(this.getPayloadPreSearch()).subscribe({
        next: (data)=>{
          console.log(data)
          this.waitList[0] = false;          
        },
        error: (error)=>{
          this.waitList[0] = false;
          this.notificationService.warning(error.error.error);
        }        
      })
    }
    else{
      this.ctrlPreSearch.markAllAsTouched();
    }
  }

  getPayloadPreSearch(): RequestFindUser{
    return {
      identification: this.ctrlPreSearch.value!
    }
  }

}
