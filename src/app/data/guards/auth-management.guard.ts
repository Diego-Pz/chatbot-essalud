import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class authManagementGuard implements CanActivate {

  constructor( private router: Router){

  }

  canActivate(){
    if (JSON.parse(localStorage.getItem('usrChatbotSeguro')!).role === 'ROLE_ADMIN') {
      return true;
    }
    else{
      this.router.navigate(['/'])
      return false;
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