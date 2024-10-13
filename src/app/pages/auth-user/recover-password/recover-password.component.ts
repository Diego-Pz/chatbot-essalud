import { Component, HostListener } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoute } from 'src/app/data/constants/app-route.constant';
import { RequestRecoverPassPart1, RequestRecoverPassPart2 } from 'src/app/data/models/user.model';
import { NotificationService } from 'src/app/data/service/notification.service';
import { UserServiceService } from 'src/app/data/service/user-service.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent {
  wait = false;
  
  formChangePass = this._formBuilder.group({
    ctrlEmail: ['', [Validators.required, Validators.email]],
  });
  
  seePass = false;
  recoverPart2: boolean = false;
  formChangePassPart2 = this._formBuilder.group({
    ctrlDocumento: ['', [Validators.required]],
    ctrlToken: ['', [Validators.required]],
    ctrlPass: ['', [Validators.required]],
  });

  isMovil = false;

  constructor(private router: Router,
              private _formBuilder: FormBuilder,
              private userService: UserServiceService,
              private notificationService: NotificationService){

  }

  ngOnInit(){
    this.comprobacionMovil();
  }

  checkRecoverPart1(){
    if (this.formChangePass.valid) {
      this.wait = true;
      this.userService.recoverPassPart1(this.getPayloadRecoverPart1()).subscribe({
        next: (data)=>{
          this.notificationService.success('Se envió un código a su correo');
          this.recoverPart2 = true;
          this.wait = false;
        },
        error: (error)=>{
          this.wait = false;
          this.notificationService.warning('El correo electrónico ingresado no corresponde a un usuario');
        }
      })
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

  checkRecoverPart2(){
    if (this.formChangePassPart2.valid) {
      this.wait = true;
      this.userService.recoverPassPart2(this.getPayloadRecoverPart2()).subscribe({
        next: (data)=>{
          this.notificationService.success('Se registró el cambio de contraseña');
          this.router.navigate(['/' + AppRoute.AUTH]);
          this.wait = false;
        },
        error: (error)=>{
          this.wait = false;
        }
      })
    }
    else{
      this.formChangePassPart2.markAllAsTouched();
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

  getPayloadRecoverPart1(): RequestRecoverPassPart1 {
    return {
      email: this.formChangePass.controls.ctrlEmail.value!
    }
  }

  getPayloadRecoverPart2(): RequestRecoverPassPart2 {
    return {
      identification: this.formChangePassPart2.controls.ctrlDocumento.value!,
      token: parseInt(this.formChangePassPart2.controls.ctrlToken.value!),
      password: this.formChangePassPart2.controls.ctrlPass.value!,
    }
  }
}
