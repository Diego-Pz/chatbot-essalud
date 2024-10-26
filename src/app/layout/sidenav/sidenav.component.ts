import { Dialog } from '@angular/cdk/dialog';
import { Component, EventEmitter, Output } from '@angular/core';
import { CompartidoFuncionesService } from 'src/app/data/service/compartido-funciones.service';
import { AddContratoUserComponent } from './add-contrato-user/add-contrato-user.component';
import { ContactWithAdministratorComponent } from './contact-with-administrator/contact-with-administrator.component';
import { DialogValoracionComponent } from './dialog-valoracion/dialog-valoracion.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

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
              private dialog: Dialog,){

  }

  ngOnInit(){
    if (this.userData) {
      if (this.userData.color == 1) {
        this.funcionesCompartidasService.ctrlModoOscuro.setValue(true);
      }
      if (this.userData.role !== "ROLE_USER") {
        this.adminLogged = true;
      }
    }
  }

  openDialogAddArchivos(){
    const dialogRef = this.dialog.open(AddContratoUserComponent,{
      width:'80%',
      maxWidth:'585px'
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
}
