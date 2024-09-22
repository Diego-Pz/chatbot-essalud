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

  constructor(private _httpClient: HttpClient) { }

  async realizarConsulta(model: RequestComunicacionChatbot){
    const url = `${URL_BASE}/ask`;
    return await lastValueFrom(this._httpClient.post<any>(url, model));
  }
}
