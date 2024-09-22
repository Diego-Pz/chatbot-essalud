import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestLoginUser, RequestRegisterUser } from '../models/auth-user.model';
import { JwtHelperService } from '@auth0/angular-jwt';

const URL_BASE = `${environment.API}/user`;

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  constructor(private _httpClient: HttpClient) { }

  logout() {
    localStorage.removeItem('usrChatbotSeguroToken');
    localStorage.removeItem('usrChatbotSeguroRefreshToken');
    localStorage.removeItem('usrChatbotSeguro');
  }

  registerUser(model: RequestRegisterUser){
    const url = `${URL_BASE}/create`;
    return this._httpClient.post<any>(url, model);
  }

  loginUser(model: RequestLoginUser){
    const url = `${environment.API}/login`;
    return this._httpClient.post<any>(url, model);
  }

  getUserSession() {
    const tokenEncoded = JSON.parse(localStorage.getItem('usrChatbotSeguroToken')!);
    return new JwtHelperService().decodeToken(tokenEncoded);
  }

  getToken(): string {
    return JSON.parse(localStorage.getItem('usrChatbotSeguroToken')!);
  }

  isAuthenticated() {
    const token = JSON.parse(localStorage.getItem('usrChatbotSeguroToken')!);
    return token && !new JwtHelperService().isTokenExpired(token);
  }
}
