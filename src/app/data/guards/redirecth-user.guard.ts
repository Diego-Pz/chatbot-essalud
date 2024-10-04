import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthUserService } from '../service/auth-user.service';

@Injectable({
  providedIn: 'root'
})
export class redirectUserGuard implements CanActivate {

  constructor( private router: Router, private authServicio: AuthUserService){

  }

  canActivate(){
    let result = false;
    if (this.authServicio.isAuthenticated()) {
      this.router.navigate(['/'])
    } else {
      result = true;
    }
    return result;
  }
}