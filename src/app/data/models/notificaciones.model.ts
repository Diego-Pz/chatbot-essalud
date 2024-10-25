export interface RequestListNotification {
    identification: string,
}

export interface RequestRegisterNotification {
    message: string,
    insuranceType?: number,
    identification?: string,
    type: number,
}

export interface RequestWatchNotification {
    idNotification : number
}