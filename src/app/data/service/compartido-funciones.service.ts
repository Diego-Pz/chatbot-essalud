import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CompartidoFuncionesService {

  ctrlModoOscuro = new FormControl(false);
  ctrlNotificaciones = new FormControl(false);

  constructor() { }
}
