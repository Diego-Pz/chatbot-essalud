import { Component, HostListener } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AppRoute } from 'src/app/data/constants/app-route.constant';
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
    ctrlTipo: ['', Validators.required],
    ctrlFechaVenc: ['', Validators.required],
    ctrlEmail: ['', [Validators.required, Validators.email]],
    ctrlPass: ['', Validators.required],
    ctrlPassAgain: ['', Validators.required]
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
    if (this.formRegister.valid) {
      localStorage.setItem('usrChatbotSeguro', JSON.stringify({nombre: 'JUAN AZCARATE'}));
      this.notificationService.success('Se registró el usuario correctamente');
      this.router.navigate(['/']);
    }
    else{
      if (this.formRegister.controls.ctrlEmail.hasError('email') || this.formRegister.controls.ctrlPass.value != this.formRegister.controls.ctrlPassAgain.value) {
        this.notificationService.warning('No se puede registrar el usuario por campos erróneos');
      }
      else{
        this.notificationService.warning('No se puede registrar el usuario por campos vacíos');
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
