import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RequestModifyAnswer } from '../models/bandeja-pregunta.molde';

const URL_BASE = `${environment.API}/comments`;

@Injectable({
  providedIn: 'root'
})
export class BandejaPreguntaService {

  constructor(private _httpClient: HttpClient) { }

  getListPreguntas(){
    const url = `${URL_BASE}/list`;
    return this._httpClient.get<any>(url);
  }

  responderPregunta(model: RequestModifyAnswer){
    const url = `${URL_BASE}/modify`;
    return this._httpClient.post<any>(url, model);
  }
}
