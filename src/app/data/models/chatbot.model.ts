export interface RequestComunicacionChatbot{
    question: string;
    identification?: string;
}

export interface RequestComunicacionChatbotRNN{
    pregunta: string;
}

export interface StructureInteraccionChatbot{
    rol: string;
    tipoMensaje: 'texto' | 'marcar';
    ordenPregunta?: number;
    interaccion: string;
    respuestaRealizada: boolean
}