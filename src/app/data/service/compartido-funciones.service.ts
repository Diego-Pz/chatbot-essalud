import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CompartidoFuncionesService {

  ctrlModoOscuro = new FormControl(false);
  ctrlFiltroSeguro = new FormControl();
  ctrlNotificaciones = new FormControl(false);

  constructor() { 
    this.ctrlModoOscuro.valueChanges.subscribe((data)=>{
      if (JSON.parse(localStorage.getItem('usrChatbotSeguro')!)) {        
        if (data) {
          JSON.parse(localStorage.getItem('usrChatbotSeguro')!).color = 1;
        }
        else{
          JSON.parse(localStorage.getItem('usrChatbotSeguro')!).color = 0;
        }
      }
    })
  }
}
