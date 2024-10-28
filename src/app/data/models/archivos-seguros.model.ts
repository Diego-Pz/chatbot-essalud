export interface RequestListArchivos {
    identification: string
}

export interface RequestDeleteArchivos {
    idInsurance: number
}

export interface RequestRegisterArchivo {
    idInsurance?: number,
    identification: string,
    nameInsurance: string,
    value: number
}