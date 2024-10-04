import { Component } from '@angular/core';
import { CompartidoFuncionesService } from '../data/service/compartido-funciones.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  opened = true;

  constructor(public compartidoService: CompartidoFuncionesService,){}
}
