import { Injectable } from '@angular/core';

import { IndividualConfig, ToastrService } from 'ngx-toastr';

const config: Partial<IndividualConfig> = {};

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private _toastrService: ToastrService) { }

  info(message: string) {
    this._toastrService.info(message, 'Información', config);
  }

  success(message: string) {
    this._toastrService.success(message, undefined, config);
  }

  error(message: string) {
    this._toastrService.error(message, 'Error', config);
  }

  warning(message: string) {
    this._toastrService.warning(message, 'Alerta', config);
  }
}
