import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CompartidoFuncionesService } from 'src/app/data/service/compartido-funciones.service';
import { NotificationService } from 'src/app/data/service/notification.service';

@Component({
  selector: 'app-dialog-show-archivo',
  templateUrl: './dialog-show-archivo.component.html',
  styleUrls: ['./dialog-show-archivo.component.scss']
})
export class DialogShowArchivoComponent {
  waitDataSend: boolean = false;
  pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl('assets/pdf/document-seguro.pdf'); 

  constructor(public compartidoService              : CompartidoFuncionesService,
              @Inject(DIALOG_DATA) public data      : any,
              private sanitizer                     : DomSanitizer,
              private _dialogRef                    : DialogRef<any>,
              private notificationService           : NotificationService,){
              
  }
  ngOnInit(){
    this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(`assets/pdf/${this.data.name_insurance}`);
    console.log(this.pdfSrc)
  }
  
  checkValid(){
    
  }
              
  close(){
    this._dialogRef.close()
  }

}
