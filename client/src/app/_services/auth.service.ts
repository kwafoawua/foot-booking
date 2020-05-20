import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { PlayerService } from './player.service';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';

const CURRENT_USER = 'currentUser';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private afAuth: AngularFireAuth,
    private playerService: PlayerService,
    private storage: LocalStorage) {}

    //TODO: mover manejo de localstorage a utils
  setCurrentUser (user): Observable<any> {
    return this.storage.setItem(CURRENT_USER, user);
  }
  getCurrentUser(): Observable<any> {
    return this.storage.getItem(CURRENT_USER);
  }

  removeCurrentUser(): Observable<any> {
    return this.storage.removeItem(CURRENT_USER);
  }

  private authenticate(uid) {
    this.http.post('/users/authenticate', { uid: uid })
      .subscribe(async (user: any) => {
        //TODO: ver si esta manipulacion se tiene que hacer en el service o le corresponde al componente
        this.setCurrentUser(user).subscribe(() => {
          this.router.navigate(['/'])
        })
      },
      error => {
        // TODO: mostrar mensaje de error
        console.log(error);
      });
  }

  logout() {
    // remove user from local storage to log user out
    this.removeCurrentUser();
    this.afAuth.auth.signOut().then().catch();
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
  async AuthLogin(provider) {
    try {
      const pUser = await this.afAuth.auth.signInWithPopup(provider);
      // TODO: separar creación de player en otro método
      if(pUser.additionalUserInfo.isNewUser) {
        const baseUser = {
          email: pUser.user.email,
          photoURL: pUser.user.photoURL,
          providerId: pUser.additionalUserInfo.providerId,
          uid: pUser.user.uid
        };
        const player = pUser.additionalUserInfo.providerId.includes('facebook')
          ? {...baseUser, ...AuthService.createFacebookUser(pUser)}
          : {...baseUser, ...AuthService.createGmailUser(pUser)};

        console.log('created player',player);

        this.playerService.create(player).subscribe(async (data: any) => {
          console.log('CREATED PLAYER', data);
          this.setCurrentUser(data.user).subscribe(() => {
            this.router.navigate(['/']);
          })
        });
      } else {
        this.authenticate(pUser.user.uid);
      }

    } catch(error) {
      console.log(error);
    }
  }

  // Sign in with email and password
  async mailLogin(email: string, password: string): Promise <any> {
    const user = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    this.authenticate(user.user.uid);
  }

  firebaseRegister(email: string, password: string): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  private static createGmailUser (user) {
    return  {
      name: <string>user.additionalUserInfo.profile.given_name,
      lastName: <string>user.additionalUserInfo.profile.family_name,

    };
  }

  private static createFacebookUser (user) {
    return  {
      name: <string>user.additionalUserInfo.profile.first_name,
      lastName: <string>user.additionalUserInfo.profile.last_name,
    };
  }

}
