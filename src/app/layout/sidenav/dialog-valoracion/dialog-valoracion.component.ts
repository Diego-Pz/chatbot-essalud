import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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
  ctrlStars = new FormControl(-1, [Validators.required]);
  ctrlDescripcion = new FormControl(null, [Validators.required]);


  constructor(public compartidoService      : CompartidoFuncionesService,
              private _dialogRef            : DialogRef<any>,
              private notificationService   : NotificationService,){
              
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
    if (this.ctrlStars.valid && this.ctrlDescripcion.valid) {
      this.waitDataSend = true;
      this._dialogRef.close(1)
      this.notificationService.success('Se registró su opinión');
      this.waitDataSend = false;
    }
  }
              
  close(){
    this._dialogRef.close()
  }
}
