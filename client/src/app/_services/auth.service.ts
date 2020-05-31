import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { PlayerService } from './player.service';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private afAuth: AngularFireAuth,
    private playerService: PlayerService) {}

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

    // TODO: mover manejo de localstorage a utils
  async setCurrentUser(user): Promise<any> {
    await null;
    return localStorage.setItem('currentUser', JSON.stringify(user));
  }
  async getCurrentUser() {
    await null;
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  deleteCurrentUser(): void {
    localStorage.removeItem('currentUser');
  }

  private authenticate(uid) {
    return this.http.post('/users/authenticate', { uid })
      .subscribe(async (user: any) => {
        await this.setCurrentUser(user);
        await this.router.navigate(['/']);
      },
      error => {
        // TODO: mostrar mensaje de error
        console.log(error);
      });
  }

  logout() {
    // remove user from local storage to log user out
    this.deleteCurrentUser();
    this.afAuth.auth.signOut().then().catch();
  }

  public isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  // TODO: estos metodos causan problemas de  performance, reemplazarlos
  public async isUserClub() {
    const currentUser = await this.getCurrentUser();
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

        console.log('created player', player);

        this.playerService.create(player).subscribe(async (data: any) => {
          console.log('CREATED PLAYER', data);
          await this.setCurrentUser(data.user);
          await this.router.navigate(['/']);
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

}
