import {throwError as observableThrowError } from 'rxjs';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { appConfig } from '../app.config';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() { }

  private getToken(): any {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
     return currentUser.token;
    }
    return '';
  }

  private handleError(error: any) {
    if (error.status === 401) {
      // 401 unauthorized response so log user out of client
      window.location.href = '/login';
    }
    return observableThrowError(error._body);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    const token = this.getToken();
    authReq = req.clone({ url: appConfig.apiUrl + req.url, headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
