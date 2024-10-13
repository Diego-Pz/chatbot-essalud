import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestComunicacionChatbot, RequestComunicacionChatbotRNN } from '../models/chatbot.model';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';
import { RegisterOpinion } from '../models/calificacion.model';

const URL_BASE = `${environment.API}`;
const URL_RNN = `${environment.API_RNN}`;

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  listPreguntasFrecuentes: any[] = [
    {idPregunta: 1, pregunta: '¿Qué coberturas abarca mi seguro regular de EsSalud?', res: 'Comprende la educación para la salud, evaluación y control de riesgos e inmunizaciones; Prestaciones de recuperación de la salud; Prestaciones de maternidad; Prestaciones de Bienestar y Promoción Social y Prestaciones económicas'},
    {idPregunta: 2, pregunta: '¿Puedo afiliar un familiar a mi seguro regular de EsSalud?', res: 'Si, los familiares directos (derechohabientes) pueden acceder a las prestaciones de salud en EsSalud: la/el cónyuge o concubina (o), los/as hijos/as menores de edad y mayores incapacitados en forma total y permanente para el trabajo (de acuerdo con la calificación que realice EsSalud).'},
    {idPregunta: 3, pregunta: '¿Qué tipos de trabajadores pueden afiliarse al seguro regular de EsSalud?', res: 'Los tipos de trabajadores posibles a asociarse pueden ser: Trabajador dependiente, Agrario, Pescador y Procesador Artesanal independiente, Trabajador de la ex CBSSP, Pensionista de la ex CBSSP'},
    {idPregunta: 4, pregunta: '¿Cuáles son las exclusiones que cubre el seguro regular de EsSalud?', res: 'Todo procedimiento o terapia que no contribuye a la recuperación o rehabilitación del paciente de naturaleza cosmética, estética o suntuaria; y todo daño derivado de la autoeliminación o lesiones autoinfligidas, excepto cuando sean originados por un diagnóstico de salud mental'},
    {idPregunta: 5, pregunta: '¿Qué tipo de procedimiento o terapia no cubre el seguro regular de EsSalud?', res: 'a.	Cirugías electivas (no recuperativas ni rehabilitadoras)\nb.	Cirugía Plástica\nc.	Odontología de Estética\nd.	Tratamiento de periodoncia y ortodoncia\ne.	Curas de reposo y del sueño\nf.	Lentes de contacto'},
    {idPregunta: 6, pregunta: '¿Qué pasos debo realizar para solicitar el cambio de establecimiento de salud afiliado?', res: 'Dirígete a la Oficina de Seguros y Prestaciones Económicas (OSPE) más cercana a tu domicilio, y presenta los requisitos al personal encargado. Luego, coordina con él tu nuevo centro de salud'},
    {idPregunta: 7, pregunta: '¿Quiénes pueden inscribirse al seguro potestativo de EsSalud?', res: 'Toda persona residente en el país, nacional o extranjero, sin límite de edad, especialmente a trabajadores independientes (profesionales, técnicos, artesanos, comerciantes, transportistas y artistas) y sus dependientes, asimismo a universitarios, practicantes y demás emprendedores; que no se encuentren afiliados a EsSalud a través de un empleador'},
    {idPregunta: 8, pregunta: '¿Cuál es el monto que debería pagar al afiliarme al seguro de salud potestativo de EsSalud?', res: 'a.	El monto por cancelar depende de la edad del asegurado:\ni.	De 0 a 17 años: S/ 137.00\nii.	De 18 a 29 años: S/ 132.00\niii.	De 30 a 59 años: S/ 138.00\niv.	De 60 años a más: S/ 215.00'},
    {idPregunta: 9, pregunta: '¿Dónde solicito mi afiliación al seguro de salud potestativo de EsSalud?', res: 'Dirígete con los requisitos a una de las Oficinas de Seguros y Prestaciones Económicas - OSPE en Lima o provincias'},
  ];

  constructor(private _httpClient: HttpClient) { }

  async realizarConsulta(model: RequestComunicacionChatbot){
    const url = `${URL_BASE}/ask`;
    return await lastValueFrom(this._httpClient.post<any>(url, model));
  }

  realizarConsultaRNN(model: RequestComunicacionChatbotRNN){
    const url = `${URL_RNN}`;
    return this._httpClient.post<any>(url, model);
  }

  registerOpinion(model: RegisterOpinion){
    const url = `${URL_BASE}/feedback/create`;
    return this._httpClient.post<any>(url, model);
  }
}
