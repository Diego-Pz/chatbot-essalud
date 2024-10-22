import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { CompartidoFuncionesService } from 'src/app/data/service/compartido-funciones.service';

@Component({
  selector: 'app-dialog-confirmacion',
  templateUrl: './dialog-confirmacion.component.html',
  styleUrls: ['./dialog-confirmacion.component.scss']
})
export class DialogConfirmacionComponent {
  constructor(@Inject(DIALOG_DATA) public data                          : any,
              public compartidoService                                  : CompartidoFuncionesService,
              private _dialogRef                                        : DialogRef<any>,) {}
  
  onClose(){
    this._dialogRef.close(0);
  }

  onConfirm(){
    this._dialogRef.close(1);
  }
}
