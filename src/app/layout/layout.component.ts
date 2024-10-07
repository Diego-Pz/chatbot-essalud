import { Component, HostListener } from '@angular/core';
import { CompartidoFuncionesService } from '../data/service/compartido-funciones.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  opened = true;

  isMovil = false;

  constructor(public compartidoService: CompartidoFuncionesService,){}

  ngOnInit(){
    this.comprobacionMovil();
  }

  comprobacionMovil(){
    if (window.innerWidth <= 1090){
      this.isMovil = true;
    }
    else{
      this.isMovil = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.comprobacionMovil();
  }
}
