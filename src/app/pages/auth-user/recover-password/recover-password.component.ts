import { Component, HostListener } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AppRoute } from 'src/app/data/constants/app-route.constant';
import { NotificationService } from 'src/app/data/service/notification.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent {
  faSpinner = faSpinner;
  wait = false;
  seePass = false;
  
  formChangePass = this._formBuilder.group({
    ctrlEmail: ['', [Validators.required, Validators.email]],
  });

  isMovil = false;

  constructor(private router: Router,
              private _formBuilder: FormBuilder,
              private notificationService: NotificationService){

  }

  ngOnInit(){
    this.comprobacionMovil();
  }

  checkRegister(){
    if (this.formChangePass.valid) {
      this.notificationService.success('Se envió una nueva contraseña a su correo');
      this.router.navigate(['/' + AppRoute.AUTH]);
    }
    else{
      if (this.formChangePass.controls.ctrlEmail.hasError('email')) {
        this.notificationService.warning('El correo ingresado no es válido');
      }
      else{
        this.notificationService.warning('El campo correo se encuentra vacío');
      }
    }
  }

  returnLogin(){
    this.router.navigate(['/' + AppRoute.AUTH]);
  }

  comprobacionMovil(){
    if (window.innerWidth <= 600) {
      this.isMovil = true;
    }
    else{
      this.isMovil = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.comprobacionMovil();
  }
}
