import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { BandejaPreguntaService } from 'src/app/data/service/bandeja-pregunta.service';
import { CompartidoFuncionesService } from 'src/app/data/service/compartido-funciones.service';
import { NotificationService } from 'src/app/data/service/notification.service';
import { ResponderPreguntaComponent } from './responder-pregunta/responder-pregunta.component';

@Component({
  selector: 'app-mantenimiento-bandeja',
  templateUrl: './mantenimiento-bandeja.component.html',
  styleUrls: ['./mantenimiento-bandeja.component.scss']
})
export class MantenimientoBandejaComponent {
  listPreguntas: any[] = [];
  waitList: boolean = false;

  constructor(public compartidoService      : CompartidoFuncionesService,
              private notificationService   : NotificationService,
              private dialog                : Dialog,
              private preguntaService       : BandejaPreguntaService,){

  }

  ngOnInit(){
    this.getDataList()
  }

  getDataList(){
    this.waitList = false;
    this.preguntaService.getListPreguntas().subscribe({
      next: (data)=>{
        this.listPreguntas = data.data;
        console.log(data.data)
        this.waitList = true;
      },
      error: (error)=>{
        this.notificationService.warning(error.error.error);
        this.waitList = true;
      }
    })
  }

  showToAnswer(obj: any){
    if (true) {
      const dialogRef = this.dialog.open(ResponderPreguntaComponent,{
        width: '80%',
        maxWidth: obj.phone ? '500px' : '650px',
        maxHeight: '90%',
        data: obj
      })
      dialogRef.closed.subscribe((data: any) =>{
        if (data) {
          this.getDataList()
        }
      })
    }
  }
}
