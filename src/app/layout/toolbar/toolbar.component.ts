import { Dialog } from '@angular/cdk/dialog';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoute } from 'src/app/data/constants/app-route.constant';
import { AuthUserService } from 'src/app/data/service/auth-user.service';
import { UpdateDataUserComponent } from './update-data-user/update-data-user.component';
import { CompartidoFuncionesService } from 'src/app/data/service/compartido-funciones.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  userData = JSON.parse(localStorage.getItem('usrChatbotSeguro')!);
  @Output() toggleSidenav = new EventEmitter();

  constructor(private router: Router,
              private dialog: Dialog,
              public compartidoService: CompartidoFuncionesService,
              private authService:  AuthUserService
  ){

  }

  logout(){
    this.authService.logout();
    window.location.reload();
  }

  onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }
  
  returnToLogin(){
    this.router.navigate(['/' + AppRoute.AUTH]);
  }

  updateDatos(){
    const dialogRef = this.dialog.open(UpdateDataUserComponent,{
      width:'80%',
      maxWidth:'585px'
    })
    dialogRef.closed.subscribe(data =>{
      
    })
  }
}
