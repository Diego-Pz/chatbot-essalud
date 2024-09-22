export interface RequestRegisterUser{
    email: string,
    identification: string,
    password: string,
    document_type: number,
    date_expiration: string
}

export interface RequestLoginUser{
    identification: string,
    password: string
}