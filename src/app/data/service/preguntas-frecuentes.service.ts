import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UpdatePreguntaFrecuente } from '../models/pregunta-frecuente.model';

const URL_BASE = `${environment.API}/frequent/questions`;

@Injectable({
  providedIn: 'root'
})
export class PreguntasFrecuentesService {

  constructor(private _httpClient: HttpClient) { }

  getPreguntasFrecuentes(){
    const url = `${URL_BASE}/list`;
    return this._httpClient.get<any>(url);
  }

  actualizarAddPregunta(model: UpdatePreguntaFrecuente){
    const url = `${URL_BASE}/create/update`;
    return this._httpClient.post<any>(url, model);
  }
}
