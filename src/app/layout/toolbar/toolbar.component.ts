import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoute } from 'src/app/data/constants/app-route.constant';
import { AuthUserService } from 'src/app/data/service/auth-user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  userData = JSON.parse(localStorage.getItem('usrChatbotSeguro')!);

  constructor(private router: Router,
              private authService:  AuthUserService
  ){

  }

  logout(){
    this.authService.logout();
    window.location.reload();
  }


  returnToLogin(){
    this.router.navigate(['/' + AppRoute.AUTH]);
  }

}
