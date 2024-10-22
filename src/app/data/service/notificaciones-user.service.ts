import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RequestRegisterNotification, RequestWatchNotification } from '../models/notificaciones.model';

const URL_BASE = `${environment.API}/notification`;

@Injectable({
  providedIn: 'root'
})
export class NotificacionesUserService {

  constructor(private _httpClient: HttpClient) { }

  getListNotificaciones(){
    const url = `${URL_BASE}/list`;
    return this._httpClient.get<any>(url);
  }

  registerNotificacion(model: RequestRegisterNotification){
    const url = `${URL_BASE}/create`;
    return this._httpClient.post<any>(url, model);
  }

  verNotificacion(model: RequestWatchNotification){
    const url = `${URL_BASE}/seen-at`;
    return this._httpClient.post<any>(url, model);
  }
}
