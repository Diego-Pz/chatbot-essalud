import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthUserService } from '../service/auth-user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public _authService: AuthUserService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this._authService.isAuthenticated()) {
      const token = this._authService.getToken();
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
    }
    return next.handle(request).pipe(
      catchError((response: HttpErrorResponse) => {
        // TODO: agregar FORBIDDEN
        if (response.status === HttpStatusCode.Unauthorized) {
          this._authService.logout();
          window.location.reload();
        }
        return throwError(response);
      })
    );
  }
}
