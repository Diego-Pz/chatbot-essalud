import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestComunicacionChatbot } from '../models/chatbot.model';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';

const URL_BASE = `${environment.API}`;

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  listPreguntasFrecuentes: any[] = [
    {idPregunta: 1, pregunta: '¿Como puedo cancelar mi plan de seguro de salud?'},
    {idPregunta: 2, pregunta: '¿Qué planes de seguros de salud están disponibles?'},
    {idPregunta: 3, pregunta: '¿Qué tipo de enfermedades y condiciones están cubiertas por EsSalud?'},
    {idPregunta: 4, pregunta: '¿Cómo se manejan los tratamientos de enfermedades crónicas?'},
    {idPregunta: 5, pregunta: '¿Es necesario algún tipo de copago para recibir atención médica?'},
    {idPregunta: 6, pregunta: '¿Qué servicios no están cubiertos por EsSalud?'},
    {idPregunta: 7, pregunta: '¿Cómo puedo acceder a medicamentos y tratamientos especiales?'},
    {idPregunta: 8, pregunta: '¿Existen limitaciones en el número de consultas o tratamientos al año?'},
  ];

  constructor(private _httpClient: HttpClient) { }

  async realizarConsulta(model: RequestComunicacionChatbot){
    const url = `${URL_BASE}/ask`;
    return await lastValueFrom(this._httpClient.post<any>(url, model));
  }
}
