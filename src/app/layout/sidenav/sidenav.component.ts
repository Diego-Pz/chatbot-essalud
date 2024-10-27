import { Dialog } from '@angular/cdk/dialog';
import { Component, EventEmitter, Output } from '@angular/core';
import { CompartidoFuncionesService } from 'src/app/data/service/compartido-funciones.service';
import { AddContratoUserComponent } from './add-contrato-user/add-contrato-user.component';
import { ContactWithAdministratorComponent } from './contact-with-administrator/contact-with-administrator.component';
import { DialogValoracionComponent } from './dialog-valoracion/dialog-valoracion.component';
import { DialogShowArchivoComponent } from './dialog-show-archivo/dialog-show-archivo.component';
import { ArchivosSegurosService } from 'src/app/data/service/archivos-seguros.service';
import { NotificationService } from 'src/app/data/service/notification.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  listArchivosUsuario: any[] = [];
  waitListArchivos = false;

  listOpcionesFiltro: any[] = [
    {value: 1, tipo: 'Regular'},
    {value: 2, tipo: 'Potestativo'},
    {value: 3, tipo: 'Trabajo de Riesgo'},
    {value: 4, tipo: 'Agrario'},
    {value: 5, tipo: 'Contra Accidentes'},
  ];

  optAdministrator: any[] = [
    {nomVista: 'Mantenimiento de usuarios', icon: 'faUsers', rutaVista: '/administracion-usuario'},
    {nomVista: 'Preguntas y respuestas', icon: 'faTableList', rutaVista: '/administracion-preguntas'},
    {nomVista: 'Bandeja de preguntas', icon: 'faEnvelope', rutaVista: '/administracion-bandeja'},
    {nomVista: 'Análisis de interacciones', icon: 'faPoll', rutaVista: '/administracion-metricas'},
  ]

  adminLogged: boolean = false;
  userData = JSON.parse(localStorage.getItem('usrChatbotSeguro')!);

  constructor(public funcionesCompartidasService : CompartidoFuncionesService,
              private archivosService            : ArchivosSegurosService,
              private notificationService        : NotificationService,
              private dialog: Dialog,){

  }

  ngOnInit(){
    if (this.userData) {
      if (this.userData.color == 1) {
        this.funcionesCompartidasService.ctrlModoOscuro.setValue(true, {emitEvent: false});
      }
      if (this.userData.role !== "ROLE_USER") {
        this.adminLogged = true;
      }
      this.getListArchivos()
    }
  }

  getListArchivos(){
    this.waitListArchivos = true;
    this.archivosService.getListArchivos({identification: this.userData.identification}).subscribe({
      next: (data)=>{
        this.waitListArchivos = false;
        data.data.forEach((element: any) => {
          let evalNombre = element.name_insurance.split('.')[0];
          switch (evalNombre) {
            case 'document-poliza':
              element.nombre = 'Seguro Regular.pdf';
              element.typeSeguro = 1;
              break;
            case 'document-poliza2':
              element.nombre = 'Seguro Potestativo.pdf';
              element.typeSeguro = 2;
              break;
            case 'document-poliza3':
              element.nombre = 'Seguro Trabajo de Riesgo.pdf';
              element.typeSeguro = 3;
              break;
            case 'document-poliza4':
              element.nombre = 'Seguro Agrario.pdf';
              element.typeSeguro = 4;
              break;
            case 'document-poliza5':
              element.nombre = 'Seguro Contra Accidentes.pdf';
              element.typeSeguro = 5;
              break;
          }
        });
        this.listArchivosUsuario = data.data;
        console.log(this.listArchivosUsuario)
        
      },
      error: (error)=>{
        this.waitListArchivos = false;
        this.notificationService.warning(error.error.detail);
      }
    })
  }

  openDialogAddArchivos(){
    const dialogRef = this.dialog.open(AddContratoUserComponent,{
      width:'80%',
      maxWidth:'585px',
      data: this.listArchivosUsuario
    })
    dialogRef.closed.subscribe(data =>{
      if (data == 1) {
        this.getListArchivos();
      }
    })
  }

  openDocument(obj: any){
    const dialogRef = this.dialog.open(DialogShowArchivoComponent,{
      width:'80%',
      maxWidth:'785px',
      height: '80%',
      data: obj
    })
    dialogRef.closed.subscribe(data =>{
      
    })
  }

  openDialogContactAdministrador(){
    const dialogRef = this.dialog.open(ContactWithAdministratorComponent,{
      width:'80%',
      maxWidth:'585px'
    })
    dialogRef.closed.subscribe(data =>{
      
    })
  }

  openDialogGiveReview(){
    const dialogRef = this.dialog.open(DialogValoracionComponent,{
      width:'80%',
      maxWidth:'585px'
    })
    dialogRef.closed.subscribe(data =>{
      
    })
  }

  activeNotification(opt: any, event: MouseEvent){
    event.stopPropagation();
    this.archivosService.registerEditArchivo({
      idInsurance: opt.id,
      identification: opt.identification,
      nameInsurance: opt.name_insurance,
      value: (opt.value == 1 ? 0 : 1)
    }).subscribe({
      next: (data)=>{
        this.notificationService.success(`Se ${opt.value == 1 ? 'deshabilitó' : 'habilitó'} el seguimiento del contrato`);
        this.getListArchivos();
      },
      error: (error)=>{
        this.notificationService.warning(error.error.detail);
      }
    })
    console.log(opt);
  }
}
