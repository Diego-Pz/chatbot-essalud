import { Component, EventEmitter, Output } from '@angular/core';
import { CompartidoFuncionesService } from 'src/app/data/service/compartido-funciones.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  @Output() toggleSidenav = new EventEmitter();
  userData = JSON.parse(localStorage.getItem('usrChatbotSeguro')!);

  constructor(public funcionesCompartidasService : CompartidoFuncionesService){

  }
  
  onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }
}
