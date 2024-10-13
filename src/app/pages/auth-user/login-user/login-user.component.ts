import { Component, HostListener } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AppRoute } from 'src/app/data/constants/app-route.constant';
import { RequestLoginUser } from 'src/app/data/models/auth-user.model';
import { AuthUserService } from 'src/app/data/service/auth-user.service';
import { NotificationService } from 'src/app/data/service/notification.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent {
  routesLink = AppRoute;
  faSpinner = faSpinner;
  wait = false;
  preLoginConfirmed = false;
  seePass = false;

  formLogin = this._formBuilder.group({
    ctrlUser: ['', Validators.required],
    ctrlPass: ['', Validators.required]
  });

  isMovil = false;

  constructor(private router: Router,
              private _formBuilder: FormBuilder,
              private authService         : AuthUserService,
              private notificationService : NotificationService){

  }

  ngOnInit(){
    this.comprobacionMovil();
  }

  checkLogin(){
    if (this.formLogin.valid) {
      this.wait = true;
      this.authService.loginUser(this.getPayload()).subscribe({
        next: (data)=>{
          localStorage.setItem('usrChatbotSeguroToken', JSON.stringify(data.access));
          localStorage.setItem('usrChatbotSeguroRefreshToken', JSON.stringify(data.refresh));
          localStorage.setItem('usrChatbotSeguro', JSON.stringify(data));
          this.notificationService.success('Se autentificó el usuario');
          this.router.navigate(['/']);
          this.wait = false;
        },
        error: (error)=>{
          this.notificationService.warning('Datos de usuario no válidos, por favor revisar');
          this.wait = false;
        }
      })
    }
    else{
      this.formLogin.markAllAsTouched()
      this.notificationService.warning('Hay campos que no han sido llenados');
    }
  }

  getPayload(): RequestLoginUser{
    return {
      identification: this.formLogin.controls.ctrlUser.value!,
      password: this.formLogin.controls.ctrlPass.value!
    }
  }

  goToRegister(){
    this.router.navigate(['/' + AppRoute.AUTH + '/' + AppRoute.REGISTER]);
  }

  anulatePreLogin(){
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
