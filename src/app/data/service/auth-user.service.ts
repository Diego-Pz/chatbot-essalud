import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  constructor() { }

  logout() {
    localStorage.removeItem('usrChatbotSeguro');
  }
}
