import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private afAuth: AngularFireAuth) {}

  setCurrentUser (user): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
  getCurrentUser (): any {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  deleteCurrentUser(): void {
    localStorage.removeItem('currentUser');
  }

  login(loginInfo) { // deprecated
    console.log(loginInfo);
    return this.http.post('/users/authenticate', loginInfo)
      .pipe(map((response: any) => {
        // login successful if there's a jwt token in the response
        let user = response;
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    this.deleteCurrentUser();
    this.afAuth.auth.signOut().then().catch();
  }

  // TODO: eliminar metodo
  public isAuthenticated(): boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser != undefined) {
      return true;
    } else {
      return false;
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

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Sign in with Google
  FacebookAuth() {
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
        console.log('logeo con google: ', result);
      }).catch((error) => {
        window.alert(error)
      })
  }

  // Sign in with email and password
  mailLogin(email: string, password: string): Promise <any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  firebaseRegister(email: string, password: string): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

}
