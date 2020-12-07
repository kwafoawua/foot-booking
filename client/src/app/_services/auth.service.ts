import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { PlayerService } from './player.service';
import { StorageService } from './storage.service';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private afAuth: AngularFireAuth,
    private playerService: PlayerService,
    private storageService: StorageService,
    ) {}

  private static createGmailUser(user) {
    return  {
      name: user.additionalUserInfo.profile.given_name as string,
      lastName: user.additionalUserInfo.profile.family_name as string,

    };
  }

  private static createFacebookUser(user) {
    return  {
      name: user.additionalUserInfo.profile.first_name as string,
      lastName: user.additionalUserInfo.profile.last_name as string,
    };
  }

  private authenticate(uid) {
    return this.http.post('/users/authenticate', { uid })
      .subscribe( (user: any) => {
        this.storageService.store('currentUser', user);
        this.router.navigate(['/']);
      },
      error => {
        // TODO: mostrar mensaje de error
        console.log(error);
      });
  }

  logout() {
    // remove user from local storage to log user out
    this.storageService.clear('currentUser');
    this.afAuth.auth.signOut().then().catch();
  }

  public isAuthenticated(): boolean {
    return !!this.storageService.getStorage('currentUser');
  }

  // TODO: estos metodos causan problemas de  performance, reemplazarlos
  public isUserClub() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser && currentUser.rol === 'Club';
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
      if (pUser.additionalUserInfo.isNewUser) {
        const baseUser = {
          email: pUser.user.email,
          photoURL: pUser.user.photoURL,
          providerId: pUser.additionalUserInfo.providerId,
          uid: pUser.user.uid
        };
        const player = pUser.additionalUserInfo.providerId.includes('facebook')
          ? {...baseUser, ...AuthService.createFacebookUser(pUser)}
          : {...baseUser, ...AuthService.createGmailUser(pUser)};


        this.playerService.create(player).subscribe(async (data: any) => {
          this.storageService.store('currentUser', data.user);
          this.router.navigate(['/']);
        });
      } else {
        this.authenticate(pUser.user.uid);
      }

    } catch (error) {
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

  updatePassword(newPassword: string) {
    const user = firebase.auth().currentUser;
    return user.updatePassword(newPassword);
  }

  updateEmail(newEmail: string) {
    const user = firebase.auth().currentUser;
    return user.updateEmail(newEmail);
  }

  forgotPassword(email: string) {
    const auth = firebase.auth();

    return auth.sendPasswordResetEmail(email);
  }

}
