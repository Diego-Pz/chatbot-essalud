export interface RequestEditInfoUser{
    identification: string,
    insurance_type?: number,
    email?: string,
    password?: string
}

export interface RequestFindUser{
    identification: string,
}

export interface RequestRecoverPassPart1{
    email: string,
}

export interface RequestRecoverPassPart2{
    identification : string,
    token: number,
    password: string
}