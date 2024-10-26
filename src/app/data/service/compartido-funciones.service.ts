import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RequestModoOscuro } from '../models/preferencias.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from './notification.service';

const URL_BASE = `${environment.API}`;

@Injectable({
  providedIn: 'root'
})
export class CompartidoFuncionesService {

  ctrlModoOscuro = new FormControl(false);
  ctrlFiltroSeguro = new FormControl();
  ctrlNotificaciones = new FormControl(false);

  constructor(private _httpClient: HttpClient, private notificationService: NotificationService) { 
    this.ctrlModoOscuro.valueChanges.subscribe((data)=>{
      if (JSON.parse(localStorage.getItem('usrChatbotSeguro')!)) {
        let userInfo = JSON.parse(localStorage.getItem('usrChatbotSeguro')!);
        if (data) {
          this.registerPreferenciaOscuro({identification: userInfo.identification, value: 1}).subscribe({
            next: (datos)=>{
              userInfo.color = 1;
              localStorage.setItem('usrChatbotSeguro', JSON.stringify(userInfo));
              this.notificationService.success('Se activó el modo oscuro');
            },
            error: (error)=>{
  
            }
          })
        }
        else{
          this.registerPreferenciaOscuro({identification: userInfo.identification, value: 0}).subscribe({
            next: (datos)=>{
              userInfo.color = 0;
              localStorage.setItem('usrChatbotSeguro', JSON.stringify(userInfo));
              this.notificationService.success('Se desactivó el modo oscuro');
            },
            error: (error)=>{
  
            }
          })
        }
      }
    })
  }

  registerPreferenciaOscuro(model: RequestModoOscuro){
    const url = `${URL_BASE}/color/web`;
    return this._httpClient.post<any>(url, model);
  }

}
