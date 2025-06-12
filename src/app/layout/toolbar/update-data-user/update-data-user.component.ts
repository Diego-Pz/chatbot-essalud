import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { RequestEditInfoUser } from 'src/app/data/models/user.model';
import { AuthUserService } from 'src/app/data/service/auth-user.service';
import { CompartidoFuncionesService } from 'src/app/data/service/compartido-funciones.service';
import { NotificationService } from 'src/app/data/service/notification.service';
import { UserServiceService } from 'src/app/data/service/user-service.service';

@Component({
  selector: 'app-update-data-user',
  templateUrl: './update-data-user.component.html',
  styleUrls: ['./update-data-user.component.scss']
})
export class UpdateDataUserComponent {
  userData = JSON.parse(localStorage.getItem('usrChatbotSeguro')!);
  infoUser = Object();
  wait: boolean = false;
  tempSelectPag: any = Object();
  ctrlSelectPag = new FormControl(null);

  dominiosPermitidos: string[] = [
    'gmail.com', 'yahoo.com', 'hotmail.com', 'upc.edu.pe', 'outlook.com',
    'live.com', 'icloud.com', 'protonmail.com', 'aol.com',
    'msn.com', 'mail.com', 'zoho.com', 'gmx.com'
  ];
  ctrlTipoSeguro = new FormControl(null, [Validators.required]);
  ctrlEmail = new FormControl('', [Validators.email, Validators.required, this.dominioEmailValido(this.dominiosPermitidos)]);
  ctrlEmailConfirmacion = new FormControl('')
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
  
  showPass = [false, false, false];
  formChangePass = this._formBuilder.group({
    ctrlActualPsss: ['', [Validators.required]],
    ctrlNewPass: ['', [Validators.required, this.passwordStrengthValidator]],
    ctrlConfirmNewPass: ['', Validators.required],
  });

  listOpciones: any[] = [
    {idOpcion: 1, nombreBtn: 'Tipo de Seguro', nomTitulo: 'Actualizar Tipo de Seguro'},
    {idOpcion: 2, nombreBtn: 'Contraseña', nomTitulo: 'Actualizar Contraseña'},
    {idOpcion: 3, nombreBtn: 'Correo Electrónico', nomTitulo: 'Actualizar Correo Electrónico'},
  ] 

  constructor(public compartidoService      : CompartidoFuncionesService,
              private userService           : UserServiceService,
              private authService           : AuthUserService,
              private _dialogRef            : DialogRef<any>,
              private notificationService   : NotificationService,
              private _formBuilder          : FormBuilder,){}

  ngOnInit(){
    this.userService.getUserInfo({identification: this.userData.identification}).subscribe({
      next: (data)=>{
        console.log(data)
        this.ctrlTipoSeguro.setValue(data.insurance_type)
      },
      error: (error)=>{
        this.notificationService.warning(error.error.detail);
      }
    })
    this.ctrlSelectPag.valueChanges.subscribe((data)=>{
      this.tempSelectPag = data;
    })
  }

  async updateValues(){
    let pasoValidacion = false;
    switch (this.ctrlSelectPag.value) {
      case this.listOpciones[0]:
        if (this.ctrlTipoSeguro.valid){
          pasoValidacion = true;
        }
        else{
          this.ctrlTipoSeguro.markAllAsTouched();
        }
        break;
      case this.listOpciones[1]:
        if (this.formChangePass.valid && (this.formChangePass.controls.ctrlNewPass.value === this.formChangePass.controls.ctrlConfirmNewPass.value)){
        try {
          const userData = await firstValueFrom(
            this.authService.loginUser({
              identification: JSON.parse(localStorage.getItem('usrChatbotSeguro')!).identification,
              password: this.formChangePass.controls.ctrlActualPsss.value!
            })
          );

          console.log('Respuesta exitosa:', userData);
          pasoValidacion = true; // solo si no lanza error
        } catch (error) {
          this.notificationService.warning('La contraseña actual no coincide, volver a intentarlo. De equivocarse 5 veces se bloqueará el acceso por 1 hora.')
          pasoValidacion = false;
        }
        }
        else{
          this.formChangePass.markAllAsTouched();
        }
        break;
      case this.listOpciones[2]:
        if (this.ctrlEmail.valid && (this.ctrlEmail.value == this.ctrlEmailConfirmacion.value)){
          pasoValidacion = true;
        }
        else{
          this.ctrlEmail.markAllAsTouched();
        }
        break;
    }

    if (pasoValidacion) {
      this.wait = true;
      this.userService.editInfoUser(this.getPayload()).subscribe({
        next: (data)=>{
          switch (this.ctrlSelectPag.value) {
            case this.listOpciones[0]:
              this.notificationService.success('Se registró el tipo de seguro correctamente');
              break;
            case this.listOpciones[1]:
              this.notificationService.success('Se actualizó la contraseña correctamente');
              break;
            case this.listOpciones[2]:
              this.notificationService.success('Se actualizó el correo electrónico correctamente');
              break;
          }
          this.wait = false;
          this._dialogRef.close();
        },
        error: (error)=>{
          this.wait = false;
          this.notificationService.warning(error.error.error);
        }
      })
    }
  }

  getPayload(): RequestEditInfoUser{
    let payload: RequestEditInfoUser = {
      identification: JSON.parse(localStorage.getItem('usrChatbotSeguro')!).identification
    };

    switch (this.ctrlSelectPag.value) {
      case this.listOpciones[0]:
        payload.insurance_type = this.ctrlTipoSeguro.value!;
        break;
      case this.listOpciones[1]:
        payload.password = this.formChangePass.controls.ctrlNewPass.value!;
        break;
      case this.listOpciones[2]:
        payload.email = this.ctrlEmail.value!;
        break;
    }

    return payload;
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
