import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { RequestComunicacionChatbot, RequestComunicacionChatbotRNN, StructureInteraccionChatbot } from 'src/app/data/models/chatbot.model';
import { ChatbotService } from 'src/app/data/service/chatbot.service';
import { NotificationService } from 'src/app/data/service/notification.service';
import { DialogPreguntasFrecuentesComponent } from '../components/dialog-preguntas-frecuentes/dialog-preguntas-frecuentes.component';
import { Dialog } from '@angular/cdk/dialog';
import { AuthUserService } from 'src/app/data/service/auth-user.service';
import { CompartidoFuncionesService } from 'src/app/data/service/compartido-funciones.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  formPregunta = this._formBuilder.group({
    ctrlPregunta: ['', [Validators.required, Validators.pattern(/^(?![\s\W_]+$).+/), Validators.maxLength(500)]],
  });

  listOpcionesFiltro: any[] = [
    {value: 1, tipo: 'Regular', contextSeguro: 'Seguro_regular.pdf'},
    {value: 2, tipo: 'Potestativo', contextSeguro: 'Seguro_potestativo.pdf'},
    {value: 3, tipo: 'Trabajo de Riesgo', contextSeguro: 'Seguro_complementario.pdf'},
    {value: 4, tipo: 'Agrario', contextSeguro: 'Seguro_agrario.pdf'},
    {value: 5, tipo: 'Contra Accidentes', contextSeguro: 'Seguro_contra_accidentes.pdf'},
  ];

  listPreg: any[] = [
    '¿Cuál es tu edad?',
    '¿Tienes alguna condición médica preexistente? (Diabetes, hipertensión, etc.)',
    '¿Necesitas cobertura para dependientes (hijos, cónyuge, etc.)?',
    '¿Te encuentras casado?',
    '¿Cuántos hijos menores de edad deseas asegurar?',
    '¿Eres trabajador independiente?',
    '¿En tu trabajo, realizas actividades de alto riesgo (trabajos peligrosos)?',
    '¿Trabajas realizando actividades de cultivo y/o crianza, avícola, agroindustrial o acuícola?',
    '¿Deseas que se indemnice en caso de muerte o invalides?',
  ];

  listPreg1: any[] = [
    {iden: 'preg1_', value: 'Menos de 18 años'},
    {iden: 'preg1_', value: 'Entre 18 y 40 años'},
    {iden: 'preg1_', value: 'Entre 40 y 60 años'},
    {iden: 'preg1_', value: 'Más de 60 años'},
  ];

  listPreg2: any[] = [
    {iden: 'preg2_', value: 'Sí'},
    {iden: 'preg2_', value: 'No'},
  ];

  listPreg3: any[] = [
    {iden: 'preg3_', value: 'Sí'},
    {iden: 'preg3_', value: 'No'},
  ];

  listPreg4: any[] = [
    {iden: 'preg4_', value: 'Sí'},
    {iden: 'preg4_', value: 'No'},
  ];

  listPreg5: any[] = [
    {iden: 'preg5_', value: '0'},
    {iden: 'preg5_', value: '1'},
    {iden: 'preg5_', value: '2'},
    {iden: 'preg5_', value: '3'},
    {iden: 'preg5_', value: '4'},
  ];

  listPreg6: any[] = [
    {iden: 'preg6_', value: 'Sí'},
    {iden: 'preg6_', value: 'No'},
  ];

  listPreg7: any[] = [
    {iden: 'preg7_', value: 'Sí'},
    {iden: 'preg7_', value: 'No'},
  ];

  listPreg8: any[] = [
    {iden: 'preg8_', value: 'Sí'},
    {iden: 'preg8_', value: 'No'},
  ];

  listPreg9: any[] = [
    {iden: 'preg9_', value: 'Sí'},
    {iden: 'preg9_', value: 'No'},
  ];


  formTipoSeguro = this._formBuilder.group({
    ctrlPreguntaUno: [''],
    ctrlPreguntaDos: [''],
    ctrlPreguntaTres: [''],
    ctrlPreguntaCuatro: [''],
    ctrlPreguntaCinco: [''],
    ctrlPreguntaSeis: [''],
    ctrlPreguntaSiete: [''],
    ctrlPreguntaOcho: [''],
    ctrlPreguntaNueve: [''],
  });

  ctrlTipoSeguro = new FormControl(false);

  dataReady: boolean = true;
  listRespuestas: StructureInteraccionChatbot[] = [];

  constructor(private chatbotService                      : ChatbotService,
              private notificationService                 : NotificationService,
              private authService                         : AuthUserService,
              private dialog                              : Dialog,
              public compartidoService                    : CompartidoFuncionesService,
              private _formBuilder                        : FormBuilder
  ){
    
  }

  ngOnInit(){
    this.setListeners();
  }

  setListeners(){
    this.ctrlTipoSeguro.valueChanges.subscribe((data)=>{
      if (data) {
        this.formPregunta.controls.ctrlPregunta.disable();
        this.ingresarPregunta(0);
      }
      else{
        this.formPregunta.controls.ctrlPregunta.enable();
        if (this.listRespuestas[this.listRespuestas.length - 1].tipoMensaje == 'marcar') {
          this.listRespuestas[this.listRespuestas.length - 1].tipoMensaje = 'texto';
        }
        this.formTipoSeguro.reset();
      }
    })

    this.formTipoSeguro.controls.ctrlPreguntaUno.valueChanges.subscribe((data)=>{
      if (data) {
        this.actualizarCampo(data);
        this.ingresarPregunta(1);
      }
    })

    this.formTipoSeguro.controls.ctrlPreguntaDos.valueChanges.subscribe((data)=>{
      if (data) {
        this.actualizarCampo(data);
        this.ingresarPregunta(2);
      }
    })

    this.formTipoSeguro.controls.ctrlPreguntaTres.valueChanges.subscribe((data)=>{
      if (data) {
        this.actualizarCampo(data);
        if (data == 'Sí') {
          this.ingresarPregunta(3);
        }
        else{
          this.ingresarPregunta(5);
        }
      }
    })

    this.formTipoSeguro.controls.ctrlPreguntaCuatro.valueChanges.subscribe((data)=>{
      if (data) {
        this.actualizarCampo(data);
        this.ingresarPregunta(4);
      }
    })

    this.formTipoSeguro.controls.ctrlPreguntaCinco.valueChanges.subscribe((data)=>{
      if (data) {
        this.actualizarCampo(data);
        this.ingresarPregunta(5);
      }
    })

    this.formTipoSeguro.controls.ctrlPreguntaSeis.valueChanges.subscribe((data)=>{
      if (data) {
        this.actualizarCampo(data);
        this.ingresarPregunta(6);
      }
    })

    this.formTipoSeguro.controls.ctrlPreguntaSiete.valueChanges.subscribe((data)=>{
      if (data) {
        this.actualizarCampo(data);
        this.ingresarPregunta(7);
      }
    })

    this.formTipoSeguro.controls.ctrlPreguntaOcho.valueChanges.subscribe((data)=>{
      if (data) {
        this.actualizarCampo(data);
        this.ingresarPregunta(8);
      }
    })

    this.formTipoSeguro.controls.ctrlPreguntaNueve.valueChanges.subscribe((data)=>{
      if (data) {
        console.log(data)
        this.actualizarCampo(data);
        this.sendTipoSeguro();
      }
    })
  }

  ingresarPregunta(orden: number){
    this.listRespuestas.push({rol: 'system', tipoMensaje: 'texto', interaccion: this.listPreg[orden], respuestaRealizada: true})
    this.listRespuestas.push({rol: 'usuario', tipoMensaje: 'marcar', ordenPregunta: orden + 1,  interaccion: '', respuestaRealizada: true})

  }

  actualizarCampo(info: string){
    this.listRespuestas[this.listRespuestas.length - 1].tipoMensaje = 'texto';
    this.listRespuestas[this.listRespuestas.length - 1].interaccion = info;
  }

  ngAfterViewChecked(){
    this.scrollToBottom();
  }

  sendPregunta(){
    if (this.formPregunta.valid && this.dataReady) {
      this.dataReady = false;
      let payload = this.getPayloadPregunta();
      this.registerMsg();
      if (this.compartidoService.ctrlFiltroSeguro.value) {
        let seguroFiltrado = this.listOpcionesFiltro.find((x)=> x.value == this.compartidoService.ctrlFiltroSeguro.value);
        console.log(seguroFiltrado)
        payload.context = seguroFiltrado.contextSeguro;
      }
      this.chatbotService.realizarConsulta(payload).then((data)=>{
        if (data.code == 200) {
          this.actualizarRespuestaChatbot(data.response);
        }
        else{
          this.notificationService.warning(data.response);
          this.dataReady = true;
        }
        this.dataReady = true;
      })
    }
    else{
      if (this.formPregunta.controls.ctrlPregunta.value == '') {
        this.notificationService.warning('Debe ingresar una pregunta en el campo de texto antes de enviarse');
      }
      this.dataReady = true;
    }
  }

  sendTipoSeguro(){
    this.dataReady = false;
    let payload = this.getPayloadPregunta();
    let textoEnviar = `Hola, tengo ${this.formTipoSeguro.controls.ctrlPreguntaUno.value}. ${this.formTipoSeguro.controls.ctrlPreguntaSeis.value == 'Sí' ? 'Soy un trabajador independiente.' : ''}
    ${this.formTipoSeguro.controls.ctrlPreguntaSiete.value == 'Sí' ? 'En mi trabajo realizo actividades de alto riesgo.' : ''}
    ${this.formTipoSeguro.controls.ctrlPreguntaOcho.value == 'Sí' ? 'En mi trabajo realizo actividades de cultivo y/o crianza, avícola, agroindustrial o acuícola.' : ''}
    ${this.formTipoSeguro.controls.ctrlPreguntaTres.value == 'Sí' ? `Deseo darles cobertura a mis ${this.formTipoSeguro.controls.ctrlPreguntaCinco.value} hijos menores de edad${this.formTipoSeguro.controls.ctrlPreguntaCuatro.value == 'Sí' ? ' y conyugue' : ''}` : ''}
    ${this.formTipoSeguro.controls.ctrlPreguntaNueve.value == 'Sí' ? 'Deseo contratar adicionalmente el Seguro contra Accidentes EsSalud (+VIDA).' : ''}
    ¿Qué seguro de salud me recomiendas utilizar, adicionalmente podrías darme los precios teniendo en cuenta mi edad, hijos y conyugue?`;

    payload.question = textoEnviar;
    this.listRespuestas.push({rol: 'system', tipoMensaje: 'texto', interaccion: '', respuestaRealizada: false})
    this.chatbotService.realizarConsulta(payload).then((data)=>{
      if (data.code == 200) {
        this.actualizarRespuestaChatbot(data.response);
        this.ctrlTipoSeguro.setValue(false);
      }
      else{
        this.notificationService.warning(data.response);
        this.dataReady = true;
      }
      this.dataReady = true;
    })
  }

  sendPreguntaRNN(){
    if (this.formPregunta.valid && this.dataReady) {
      this.dataReady = false;
      let payload = this.getPayloadRNN();
      this.registerMsg();
      this.chatbotService.realizarConsultaRNN(payload).subscribe({
        next: (data)=>{
          this.actualizarRespuestaChatbot(data.respuesta);
        },
        error: (error)=>{
          this.dataReady = false;
          this.notificationService.warning(error.error.error);
        }
      })
    }
    else{
      if (this.formPregunta.controls.ctrlPregunta.value == '') {
        this.notificationService.warning('Debe ingresar una pregunta en el campo de texto antes de enviarse');
      }
      this.dataReady = true;
    }
  }

  registerMsg(){
    this.listRespuestas.push({rol: 'usuario', tipoMensaje: 'texto', interaccion: this.formPregunta.controls.ctrlPregunta.value!, respuestaRealizada: true})
    this.formPregunta.reset()
    this.listRespuestas.push({rol: 'system', tipoMensaje: 'texto', interaccion: '', respuestaRealizada: false})    
  }

  actualizarRespuestaChatbot(resp: string){
    this.listRespuestas[this.listRespuestas.length - 1].interaccion = resp;
    this.listRespuestas[this.listRespuestas.length - 1].respuestaRealizada = true;
    this.dataReady = true;
  }

  getPayloadPregunta(): RequestComunicacionChatbot{
    let payload: RequestComunicacionChatbot = {
      question: this.formPregunta.controls.ctrlPregunta.value!,
      context: null!
    }

    if (this.authService.isAuthenticated()) {
      payload.identification = JSON.parse(localStorage.getItem('usrChatbotSeguro')!).identification;
    }

    return payload;
  }

  getPayloadRNN(): RequestComunicacionChatbotRNN {
    return {
      pregunta: this.formPregunta.controls.ctrlPregunta.value!
    }
  }

  private scrollToBottom(): void {
    const container = this.chatContainer.nativeElement;
    container.scrollTop = container.scrollHeight;
  }

  openDialogPreguntasFrecuentes(){
    const dialogRef = this.dialog.open(DialogPreguntasFrecuentesComponent,{
      width: '80%',
      maxWidth: '1086px',
      maxHeight: '90%',
    })
    dialogRef.closed.subscribe((data: any) =>{
      if (data) {
        this.formPregunta.controls.ctrlPregunta.setValue(data)
        this.sendPreguntaRNN()
      }
    })
  }
}
