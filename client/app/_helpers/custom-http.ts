import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { appConfig } from '../app.config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class CustomHttp extends HttpClient {
  constructor(handler: HttpHandler) {
    super(handler);
  }

  get(url: string, options?: Object): Observable<any> {
    return super.get(appConfig.apiUrl + url, this.addJwt(options)).catch(this.handleError);
  }

  post(url: string, body: string, options?: Object): Observable<any> {
    return super.post(appConfig.apiUrl + url, body, this.addJwt(options)).catch(this.handleError);
  }

  put(url: string, body: string, options?: Object): Observable<any> {
    return super.put(appConfig.apiUrl + url, body, this.addJwt(options)).catch(this.handleError);
  }

  delete(url: string, options?: Object): Observable<any> {
    return super.delete(appConfig.apiUrl + url, this.addJwt(options)).catch(this.handleError);
  }

  // private helper methods

  private addJwt(options?: any): any {
    // ensure request options and headers are not null
    options = options || {};
    options.headers = options.headers || new Headers();

    // add authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      options.headers.append('Authorization', 'Bearer ' + currentUser.token);
    }

    return options;
  }

  private handleError(error: any) {
    if (error.status === 401) {
      // 401 unauthorized response so log user out of client
      window.location.href = '/login';
    }

    return Observable.throw(error._body);
  }
}

export function customHttpFactory(handler: HttpHandler): HttpClient {
  return new CustomHttp(handler);
}

export let customHttpProvider = {
  provide: HttpClient,
  useFactory: customHttpFactory,
  deps: [HttpHandler ]
};
