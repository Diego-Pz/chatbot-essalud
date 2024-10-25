import { Dialog } from '@angular/cdk/dialog';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoute } from 'src/app/data/constants/app-route.constant';
import { AuthUserService } from 'src/app/data/service/auth-user.service';
import { UpdateDataUserComponent } from './update-data-user/update-data-user.component';
import { CompartidoFuncionesService } from 'src/app/data/service/compartido-funciones.service';
import { NotificationService } from 'src/app/data/service/notification.service';
import { NotificacionesUserService } from 'src/app/data/service/notificaciones-user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  listNotificaciones: any[] = [];
  waitListaNotificaciones = false;

  userData = JSON.parse(localStorage.getItem('usrChatbotSeguro')!);
  @Output() toggleSidenav = new EventEmitter();

  constructor(private router: Router,
              private dialog: Dialog,
              public compartidoService: CompartidoFuncionesService,
              private notificationService: NotificationService,
              private notiUserService: NotificacionesUserService,
              private authService:  AuthUserService
  ){

  }

  logout(){
    this.authService.logout();
    window.location.reload();
  }

  getDataNotificaciones(){
    this.waitListaNotificaciones = true;
    this.listNotificaciones = [];
    this.notiUserService.getListNotificaciones({identification: this.userData.identification}).subscribe({
      next: (data)=>{
        this.listNotificaciones = data.data.sort((a: any,b: any)=> b.id - a.id);
        console.log(this.listNotificaciones);
        this.waitListaNotificaciones = false;
      },
      error: (error)=>{
        this.waitListaNotificaciones = false;
        this.notificationService.warning(error.error.error);
      }
    })
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
