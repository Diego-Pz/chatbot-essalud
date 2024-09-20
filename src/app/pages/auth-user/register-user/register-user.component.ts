import { Component, HostListener } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AppRoute } from 'src/app/data/constants/app-route.constant';
import { RequestRegisterUser } from 'src/app/data/models/auth-user.model';
import { AuthUserService } from 'src/app/data/service/auth-user.service';
import { NotificationService } from 'src/app/data/service/notification.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent {
  faSpinner = faSpinner;
  wait = false;
  seePass = false;
  
  formRegister = this._formBuilder.group({
    ctrlUser: ['', Validators.required],
    ctrlTipo: [null, Validators.required],
    ctrlFechaVenc: ['', Validators.required],
    ctrlEmail: ['', [Validators.required, Validators.email]],
    ctrlPass: ['', Validators.required],
    ctrlPassAgain: ['', Validators.required]
  });

  isMovil = false;

  constructor(private router                : Router,
              private _formBuilder          : FormBuilder,
              private authService           : AuthUserService,
              private notificationService   : NotificationService){

  }

  ngOnInit(){
    this.comprobacionMovil();
  }

  checkRegister(){console.log(this.getPayload())
    if (this.formRegister.valid) {
      this.authService.registerUser(this.getPayload()).then((data)=>{
        this.notificationService.success('Se registró el usuario correctamente');
        this.router.navigate(['/login']);
      })
      // localStorage.setItem('usrChatbotSeguro', JSON.stringify({nombre: 'JUAN AZCARATE'}));
    }
    else{
      if (this.formRegister.controls.ctrlEmail.hasError('email') || this.formRegister.controls.ctrlPass.value != this.formRegister.controls.ctrlPassAgain.value) {
        this.notificationService.warning('No se puede registrar el usuario por campos erróneos');
      }
      else{
        this.notificationService.warning('No se puede registrar el usuario por campos vacíos');
      }
      this.formRegister.markAllAsTouched()
    }
  }

  getPayload(): RequestRegisterUser{
    let fecha = this.formRegister.controls.ctrlFechaVenc.value!;    
    if (fecha) {
      fecha = `${fecha.split('/')[2]}-${fecha.split('/')[1]}-${fecha.split('/')[0]}`;
    }

    return {
      email: this.formRegister.controls.ctrlEmail.value!,
      identification: this.formRegister.controls.ctrlUser.value!,
      password: this.formRegister.controls.ctrlPass.value!,
      document_type: this.formRegister.controls.ctrlTipo.value!,
      date_expiration: fecha
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
