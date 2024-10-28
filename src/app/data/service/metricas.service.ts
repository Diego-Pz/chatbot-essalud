import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL_BASE = `${environment.API}/report`;

@Injectable({
  providedIn: 'root'
})
export class MetricasService {

  constructor(private _httpClient: HttpClient) { }

  getListArchivos(){
    const url = `${URL_BASE}`;
    return this._httpClient.get<any>(url);
  }
}
