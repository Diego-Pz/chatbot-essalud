import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestEditInfoUser } from '../models/user.model';
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
}
