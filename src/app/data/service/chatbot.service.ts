import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestComunicacionChatbot, RequestComunicacionChatbotRNN } from '../models/chatbot.model';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';

const URL_BASE = `${environment.API}`;
const URL_RNN = `${environment.API_RNN}`;

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  listPreguntasFrecuentes: any[] = [
    {idPregunta: 1, pregunta: '¿Qué coberturas abarca mi seguro regular de EsSalud?'},
    {idPregunta: 2, pregunta: '¿Puedo afiliar un familiar a mi seguro regular de EsSalud?'},
    {idPregunta: 3, pregunta: '¿Qué tipos de trabajadores pueden afiliarse al seguro regular de EsSalud?'},
    {idPregunta: 4, pregunta: '¿Cuáles son las exclusiones que cubre el seguro regular de EsSalud?'},
    {idPregunta: 5, pregunta: '¿Qué tipo de procedimiento o terapia no cubre el seguro regular de EsSalud?'},
    {idPregunta: 6, pregunta: '¿Qué pasos debo realizar para solicitar el cambio de establecimiento de salud afiliado?'},
    {idPregunta: 7, pregunta: '¿Quiénes pueden inscribirse al seguro potestativo de EsSalud?'},
    {idPregunta: 8, pregunta: '¿Cuál es el monto que debería pagar al afiliarme al seguro de salud potestativo de EsSalud?'},
  ];

  constructor(private _httpClient: HttpClient) { }

  async realizarConsulta(model: RequestComunicacionChatbot){
    const url = `${URL_BASE}/ask`;
    return await lastValueFrom(this._httpClient.post<any>(url, model));
  }

  realizarConsultaRNN(model: RequestComunicacionChatbotRNN){
    const url = `${URL_RNN}`;
    return this._httpClient.post<any>(url, model);
  }
}
