import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ChatbotService } from 'src/app/data/service/chatbot.service';
import { CompartidoFuncionesService } from 'src/app/data/service/compartido-funciones.service';
import { NotificationService } from 'src/app/data/service/notification.service';

@Component({
  selector: 'app-mantenimiento-preguntas',
  templateUrl: './mantenimiento-preguntas.component.html',
  styleUrls: ['./mantenimiento-preguntas.component.scss']
})
export class MantenimientoPreguntasComponent {

  pregSelected!: any;
  formChange = this._formBuilder.group({
    ctrlPreguntaChange: ['', Validators.required]
  });
  readySend: boolean = false;

  constructor(public compartidoService      : CompartidoFuncionesService,
              public chatbotService         : ChatbotService,
              private notificationService   : NotificationService,
              private _formBuilder          : FormBuilder,){

  }

  ngOnInit(){

  }

  return(){
    this.formChange.reset();
    this.pregSelected = null;
  }

  updatePregunta(){
    if (this.formChange.valid) {
      this.readySend = true;

      this.chatbotService.listPreguntasFrecuentes.find((x) => x == this.pregSelected).pregunta = this.formChange.controls.ctrlPreguntaChange.value!;
      this.formChange.reset();
      this.pregSelected = null;

      this.notificationService.success('Se actualizó la pregunta seleccionada');
      this.readySend = false;
    }
    else{
      this.formChange.markAllAsTouched();
    }
  }
}
