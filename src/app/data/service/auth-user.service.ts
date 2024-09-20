import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestRegisterUser } from '../models/auth-user.model';

const URL_BASE = `${environment.API}/users`;

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  constructor(private _httpClient: HttpClient) { }

  logout() {
    localStorage.removeItem('usrChatbotSeguro');
  }

  async registerUser(model: RequestRegisterUser){
    const url = `${URL_BASE}/create`;
    return await lastValueFrom(this._httpClient.post<any>(url, model));
  }
}
