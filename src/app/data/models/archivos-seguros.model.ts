export interface RequestListArchivos {
    identification: string
}

export interface RequestRegisterArchivo {
    idInsurance?: number,
    identification: string,
    nameInsurance: string,
    value: number
}