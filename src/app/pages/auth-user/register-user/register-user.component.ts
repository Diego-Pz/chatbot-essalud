import { Component, HostListener } from '@angular/core';
import { Validators, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
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
  today = new Date();
  dominiosPermitidos: string[] = [
    'gmail.com', 'yahoo.com', 'hotmail.com', 'upc.edu.pe', 'outlook.com',
    'live.com', 'icloud.com', 'protonmail.com', 'aol.com',
    'msn.com', 'mail.com', 'zoho.com', 'gmx.com'
  ];
  
  formRegister = this._formBuilder.group({
    ctrlUser: [''],
    ctrlTipo: [null, Validators.required],
    ctrlFechaVenc: ['', Validators.required],
    ctrlEmail: ['', [Validators.required, Validators.email, this.dominioEmailValido(this.dominiosPermitidos)]],
    ctrlPass: ['', [Validators.required, this.passwordStrengthValidator]],
    ctrlPassAgain: ['', Validators.required]
  });

  dominioEmailValido(dominios: string[]) {
    return (control: AbstractControl): ValidationErrors | null => {
      const valor = control.value;
      if (!valor) return null;

      const partes = valor.split('@');
      if (partes.length !== 2) return { dominioInvalido: true };

      const dominio = partes[1].toLowerCase();
      return dominios.includes(dominio) ? null : { dominioInvalido: true };
    };
  }
  
  isMovil = false;

  constructor(private router                : Router,
              private _formBuilder          : FormBuilder,
              private authService           : AuthUserService,
              private notificationService   : NotificationService){

  }

  ngOnInit(){
    this.setListeners();
    this.comprobacionMovil();
  }

  setListeners(){
    this.formRegister.controls.ctrlTipo.valueChanges.subscribe((data)=>{
      if (data) {
        const doc = this.formRegister.controls.ctrlUser;
        if (data == 1) {
          doc?.setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(8)]);
        }
        else{
          doc?.setValidators([Validators.required, Validators.minLength(12)]);
        }
        doc?.updateValueAndValidity();
      }
    })
  }

  checkRegister(){
    if (this.formRegister.valid) {
      this.authService.registerUser(this.getPayload()).subscribe({
        next: (data)=>{
          this.notificationService.success('Se registró el usuario correctamente');
          this.router.navigate(['/auth']);
        },
        error: (error)=>{
          if (error.error.email) {
            this.notificationService.warning('Esta dirección de correo ya se encuentra en uso');
            this.formRegister.controls.ctrlEmail.reset();
          }
          if (error.error.identification) {
            this.notificationService.warning('Este número de documento ya se encuentra en uso');
            this.formRegister.controls.ctrlUser.reset();
          }
          console.log(error)
        }
      })
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

  soloNumeros(event: KeyboardEvent): boolean {
    const patron = /[0-9]/;
    const charInput = document ? event.key : event.code;
    return patron.test(charInput);
  }

  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);

    const valid = hasUpperCase && hasLowerCase && hasNumber;

    return valid ? null : { passwordStrength: true };
  }
}
