import { Component, HostListener } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AppRoute } from 'src/app/data/constants/app-route.constant';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent {
  faSpinner = faSpinner;
  wait = false;
  preLoginConfirmed = false;
  seePass = false;
  
  formLogin = this._formBuilder.group({
    ctrlUser: ['', Validators.required],
    ctrlTipo: ['', Validators.required],
    ctrlFechaVenc: ['', Validators.required],
    ctrlEmail: ['', Validators.required],
    ctrlPass: ['', Validators.required]
  });

  isMovil = false;

  constructor(private router: Router,
              private _formBuilder: FormBuilder){

  }

  ngOnInit(){
    this.comprobacionMovil();
  }

  checkRegister(){
    localStorage.setItem('usrChatbotSeguro', JSON.stringify({nombre: 'JUAN AZCARATE'}));
    this.router.navigate(['/']);
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
