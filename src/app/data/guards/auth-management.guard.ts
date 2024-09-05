import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class authManagementGuard implements CanActivate {

  constructor( private router: Router){

  }

  canActivate(){
    //const token = this.tokenService.getToken()
    //const isValidToken = this.tokenService.isValidToken()
    if (localStorage.getItem('usrChatbotSeguroManagement') == null || localStorage.getItem('usrChatbotSeguroManagement') == 'undefined') {
      this.router.navigate(['/management/login'])
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