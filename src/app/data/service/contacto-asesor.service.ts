import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RequestRegisterAsesorNumero, RequestRegisterAsesorPregunta } from '../models/comunicacion-asesor.model';

const URL_BASE = `${environment.API}/user/comments`;

@Injectable({
  providedIn: 'root'
})
export class ContactoAsesorService {

  constructor(private _httpClient: HttpClient) { }

  registerPreguntaAsesor(model: RequestRegisterAsesorPregunta){
    const url = `${URL_BASE}/email`;
    return this._httpClient.post<any>(url, model);
  }

  registerNumeroaAsesor(model: RequestRegisterAsesorNumero){
    const url = `${URL_BASE}/phone`;
    return this._httpClient.post<any>(url, model);
  }
}
