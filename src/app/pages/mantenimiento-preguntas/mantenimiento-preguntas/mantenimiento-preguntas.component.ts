import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UpdatePreguntaFrecuente } from 'src/app/data/models/pregunta-frecuente.model';
import { ChatbotService } from 'src/app/data/service/chatbot.service';
import { CompartidoFuncionesService } from 'src/app/data/service/compartido-funciones.service';
import { NotificationService } from 'src/app/data/service/notification.service';
import { PreguntasFrecuentesService } from 'src/app/data/service/preguntas-frecuentes.service';

@Component({
  selector: 'app-mantenimiento-preguntas',
  templateUrl: './mantenimiento-preguntas.component.html',
  styleUrls: ['./mantenimiento-preguntas.component.scss']
})
export class MantenimientoPreguntasComponent {

  listPreguntas: any[] = [];
  waitList: boolean = false;
  pregSelected!: any;
  formChange = this._formBuilder.group({
    ctrlPreguntaChange: ['', Validators.required],
    ctrlRespuestaChange: ['', Validators.required]
  });
  readySend: boolean = false;

  constructor(public compartidoService      : CompartidoFuncionesService,
              public chatbotService         : ChatbotService,
              private notificationService   : NotificationService,
              public preguntaServicio       : PreguntasFrecuentesService,
              private _formBuilder          : FormBuilder,){

  }

  ngOnInit(){
    this.getPreguntas()
  }

  getPreguntas(){
    this.waitList = false;
    this.preguntaServicio.getPreguntasFrecuentes().subscribe({
      next: (data)=>{
        this.listPreguntas = data.data;
        this.waitList = true;
      },
      error: (error)=>{
        this.notificationService.warning(error.error.error);
        this.waitList = true;
      }
    })
  }

  return(){
    this.formChange.reset();
    this.pregSelected = null;
  }

  updatePregunta(){
    if (this.formChange.valid) {
      this.readySend = true;
      this.preguntaServicio.actualizarAddPregunta(this.getPayloadUpdate()).subscribe({
        next: (data)=>{
          this.formChange.reset();
          this.getPreguntas();
          this.pregSelected = null;
    
          this.notificationService.success('Se registró el cambio de la pregunta');
          this.readySend = false;
        },
        error: (error)=>{
          this.notificationService.warning(error.error.error);
          this.readySend = false;
        }
      })
    }
    else{
      this.formChange.markAllAsTouched();
    }
  }

  getPayloadUpdate(): UpdatePreguntaFrecuente{
    return {
      id: this.pregSelected.id,
      question : this.formChange.controls.ctrlPreguntaChange.value!,
      answer : this.formChange.controls.ctrlRespuestaChange.value!,
      active: 1
    }
  }
}
