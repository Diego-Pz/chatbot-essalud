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

  @Output() toggleSidenav = new EventEmitter();
  userData = JSON.parse(localStorage.getItem('usrChatbotSeguro')!);

  constructor(public funcionesCompartidasService : CompartidoFuncionesService,
              private dialog: Dialog,){

  }
  
  onToggleSidenav(): void {
    this.toggleSidenav.emit();
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
