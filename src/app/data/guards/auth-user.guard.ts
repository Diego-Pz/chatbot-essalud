import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class authUsernGuard implements CanActivate {

  constructor( private router: Router){

  }

  canActivate(){
    //const token = this.tokenService.getToken()
    //const isValidToken = this.tokenService.isValidToken()
    if (localStorage.getItem('usrChatbotSeguro') == null || localStorage.getItem('usrChatbotSeguro') == 'undefined') {
      this.router.navigate(['/auth'])
      return false;
    }
    else{
      return true;
    }
    // const isValidToken = this.tokenService.isValidRefreshToken()
    // if (!isValidToken)
    // {
    //   this.router.navigate(['/login'])
    //   return false
    // }
    // return true;
  }
}