import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RequestRegisterArchivo } from 'src/app/data/models/archivos-seguros.model';
import { ArchivosSegurosService } from 'src/app/data/service/archivos-seguros.service';
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
  listOpciones = [
    {value: 1, nombre: 'Seguro Regular', nomDocumento: 'document-poliza'},
    {value: 2, nombre: 'Seguro Potestativo', nomDocumento: 'document-poliza2'},
    {value: 3, nombre: 'Seguro de Trabajos de Riesgo', nomDocumento: 'document-poliza3'},
    {value: 4, nombre: 'Seguro Agrario', nomDocumento: 'document-poliza4'},
    {value: 5, nombre: 'Seguro contra Accidentes EsSalud', nomDocumento: 'document-poliza5'},
  ]

  ctrlTipoSeguro = new FormControl(null, [Validators.required]);


  constructor(public compartidoService              : CompartidoFuncionesService,
              private userService                   : UserServiceService,
              private archivosService               : ArchivosSegurosService,
              @Inject(DIALOG_DATA) public data      : any,
              private _dialogRef                    : DialogRef<any>,
              private notificationService           : NotificationService,){
              
  }
  ngOnInit(){
    if (this.data.length > 0) {
      this.listOpciones = this.listOpciones.filter((x)=> !this.data.find((element: any)=> element.typeSeguro == x.value))
    }
    console.log(this.data)
  }
  
  checkValid(){
    if (this.ctrlTipoSeguro.valid) {
      this.waitDataSend = true;
      this.archivosService.registerEditArchivo(this.getPayload()).subscribe({
        next: (data)=>{
          this._dialogRef.close(1)
          this.notificationService.success('Se añadió el documento a su bandeja');
          this.waitDataSend = false;
        },
        error: (error)=>{
          this.waitDataSend = false;
          this.notificationService.warning(error.error.detail);
        }
      })
      // this.waitDataSend = false;
    }
  }
              
  close(){
    this._dialogRef.close()
  }

  getPayload(): RequestRegisterArchivo{
    let findValor = this.listOpciones.find((x) => x.value == this.ctrlTipoSeguro.value);
    return {
      idInsurance: null!,
      identification: JSON.parse(localStorage.getItem('usrChatbotSeguro')!).identification,
      nameInsurance: `${findValor!.nomDocumento}.pdf`,
      value: 0
    }
  }
}
