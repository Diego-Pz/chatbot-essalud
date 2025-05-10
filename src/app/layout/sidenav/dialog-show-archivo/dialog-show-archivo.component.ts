import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ArchivosSegurosService } from 'src/app/data/service/archivos-seguros.service';
import { CompartidoFuncionesService } from 'src/app/data/service/compartido-funciones.service';
import { NotificationService } from 'src/app/data/service/notification.service';

@Component({
  selector: 'app-dialog-show-archivo',
  templateUrl: './dialog-show-archivo.component.html',
  styleUrls: ['./dialog-show-archivo.component.scss']
})
export class DialogShowArchivoComponent {
  waitDataDelete: boolean = false;
  waitDownload: boolean = false;
  pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl('assets/pdf/document-seguro.pdf'); 

  constructor(public compartidoService              : CompartidoFuncionesService,
              private archivosService               : ArchivosSegurosService,
              @Inject(DIALOG_DATA) public data      : any,
              private sanitizer                     : DomSanitizer,
              private _dialogRef                    : DialogRef<any>,
              private notificationService           : NotificationService,){
              
  }
  ngOnInit(){
    this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(`assets/pdf/${this.data.name_insurance}`);
    console.log(this.data)
  }

  downloadPdf() {
    this.waitDownload = true;
    const link = document.createElement('a');
    link.href = `assets/pdf/${this.data.name_insurance}`;
    link.download = this.data.name_insurance;
    link.click();
    this.waitDownload = false;
  }
              
  close(){
    this.waitDataDelete = true;
    this.archivosService.deletetArchivosList({idInsurance: this.data.id}).subscribe({
      next: (data)=>{
        this.notificationService.success(`Se eliminó con exito el documento en su bandeja`);
        this._dialogRef.close(2)
        this.waitDataDelete = false;
      },
      error: (error)=>{
        this.notificationService.warning(error.error.detail);
        this.waitDataDelete = false;
      }
    })
  }

}
