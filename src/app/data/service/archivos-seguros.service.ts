import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RequestListArchivos, RequestRegisterArchivo } from '../models/archivos-seguros.model';

const URL_BASE = `${environment.API}/document/insurance`;

@Injectable({
  providedIn: 'root'
})
export class ArchivosSegurosService {

  constructor(private _httpClient: HttpClient) { }

  getListArchivos(model: RequestListArchivos){
    const url = `${URL_BASE}/list`;
    return this._httpClient.post<any>(url, model);
  }

  registerEditArchivo(model: RequestRegisterArchivo){
    const url = `${URL_BASE}/create`;
    return this._httpClient.post<any>(url, model);
  }
}
