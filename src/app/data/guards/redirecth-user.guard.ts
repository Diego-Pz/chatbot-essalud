import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class redirectUserGuard implements CanActivate {

  constructor( private router: Router){

  }

  canActivate(){
    //const token = this.tokenService.getToken()
    //const isValidToken = this.tokenService.isValidToken()
    let validacion = localStorage.getItem('usrChatbotSeguro') == null || localStorage.getItem('usrChatbotSeguro') == 'undefined';
    if (!validacion) {
      this.router.navigate(['/'])
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