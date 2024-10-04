import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthUserService } from '../service/auth-user.service';

@Injectable({
  providedIn: 'root'
})
export class authUsernGuard implements CanActivate {

  constructor( private router: Router, private authServicio: AuthUserService){

  }

  canActivate(){
    let result = false;
    if (this.authServicio.isAuthenticated()) {
      result = true;
    } else {
      this.authServicio.logout();
    }
    return result;
  }
}