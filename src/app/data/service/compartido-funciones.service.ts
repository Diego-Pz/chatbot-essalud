import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CompartidoFuncionesService {

  ctrlModoOscuro = new FormControl(false);
  ctrlFiltroSeguro = new FormControl();
  ctrlNotificaciones = new FormControl(false);

  constructor() { }
}
