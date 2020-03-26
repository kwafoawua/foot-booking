import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) {
    this.getUserAuthenticated();
  }

  login(username: string, password: string) {
    console.log(username, password);
    return this.http.post('/users/authenticate', { username: username, password: password })
      .map((response: any) => {
        // login successful if there's a jwt token in the response
        let user = response;
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  public isAuthenticated(): boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser != undefined) {
      return true;
    } else {
      return false;
    }
  }

  public getUserAuthenticated(): Observable<string> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser != undefined) {
      return currentUser.username;
    }
  }


  public isUserClub(): boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser != undefined) {
      if (currentUser.rol == 'Club')
        return true;
      else
        return false;
    }
  }

  public getPlayerByUserId() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser != undefined) {
      return this.http.get('/player', currentUser._id);
    }
  }

}
