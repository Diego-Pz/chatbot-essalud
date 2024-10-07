import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestEditInfoUser, RequestFindUser, RequestRecoverPassPart1, RequestRecoverPassPart2 } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';

const URL_BASE = `${environment.API}/user`;

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private _httpClient: HttpClient) { }

  editInfoUser(model: RequestEditInfoUser){
    const url = `${URL_BASE}/update`;
    return this._httpClient.post<any>(url, model);
  }

  getUserInfo(model: RequestFindUser){
    const url = `${URL_BASE}/find`;
    return this._httpClient.post<any>(url, model);
  }

  recoverPassPart1(model: RequestRecoverPassPart1){
    const url = `${URL_BASE}/recovery`;
    return this._httpClient.post<any>(url, model);
  }

  recoverPassPart2(model: RequestRecoverPassPart2){
    const url = `${URL_BASE}/recovery/password`;
    return this._httpClient.post<any>(url, model);
  }
}
