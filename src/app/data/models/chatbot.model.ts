export interface RequestComunicacionChatbot{
    question: string;
    identification?: string;
}

export interface StructureInteraccionChatbot{
    rol: string;
    interaccion: string;
    respuestaRealizada: boolean
}