import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class redirecthManagementGuard implements CanActivate {

  constructor( private router: Router){

  }

  canActivate(){
    //const token = this.tokenService.getToken()
    //const isValidToken = this.tokenService.isValidToken()
    let validacion = localStorage.getItem('usrChatbotSeguroManagement') == null || localStorage.getItem('usrChatbotSeguroManagement') == 'undefined';
    if (!validacion) {
      this.router.navigate(['/management'])
      return false;
    }
    else{
      return true;
    }
    // const isValidToken = this.tokenService.isValidRefreshToken()
    // if (isValidToken)
    // {
    //   this.router.navigate(['/app'])
    // }
    // return true;
  }
}