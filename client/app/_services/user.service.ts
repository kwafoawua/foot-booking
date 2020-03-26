import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { User } from '../_models/user';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService {
  /* user: Observable<any>;
   private _user: BehaviorSubject<any>;
   private dataStore: {
       user: {}
   };*/
  // Observable string sources
  private usuario: BehaviorSubject<any>;
  public usuario$: Observable<any>;

  // Observable string streams
  // usuario$ = this.usuario.asObservable();

  constructor(private http: HttpClient) {
    this.usuario = new BehaviorSubject<any>({});
    this.usuario$ = this.usuario.asObservable();
    /* this.dataStore = { user: {} };
     this._user = <BehaviorSubject<any>>new BehaviorSubject({});
     this.user = this._user.asObservable();*/
  }

  getAll() {
    return this.http.get('/users', this.jwt());
  }

  getById(_id: string) {
    return this.http.get('/users/' + _id);
  }

  getByUsername(username: string) {
    return this.http.get<User>('/users/' + username);
    /* .subscribe(user => {
         this.usuario.next(user);
     });*/
    /* this.http.get('/users/' + username)
         .map((response: Response) => response.json()).subscribe(data =>{
          //   console.log(data);
                     this.dataStore.user = data;
             this._user.next(Object.assign({}, this.dataStore).user);
           //  console.log(this.dataStore);
         }, error => console.log('No se pudo cargar el usuario'));*/
  };

  create(user: User) {
    return this.http.post('/users/register', user);
  }

  updateEmail(form: any) {
    return this.http.put('/users/setemail', form);
  }

  updatePassword(user: any) {
    return this.http.put('/users/setPassword', user);
  }

  update(user: User) {
    return this.http.put('/users/' + user._id, user);
  }

  delete(_id: string) {
    return this.http.delete('/users/' + _id);
  }


  getUserByCreatorId(_id: string) {
    return this.http.get('/users/' + _id);
  }

  // private helper methods
  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      return { headers: new HttpHeaders().set("Authorization", 'Bearer' + currentUser.token) };
    }
  }

  public publishData(data: any) {
    this.usuario.next(data);
  }
}
