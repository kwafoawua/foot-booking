import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
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

  constructor(private http: Http) {
    this.usuario = new BehaviorSubject<any>({});
    this.usuario$ = this.usuario.asObservable();
    /* this.dataStore = { user: {} };
     this._user = <BehaviorSubject<any>>new BehaviorSubject({});
     this.user = this._user.asObservable();*/
  }

  getAll() {
    return this.http.get('/users', this.jwt())
      .map((response: Response) => response.json());
  }

  getById(_id: string) {
    return this.http.get('/users/' + _id)
      .map((response: Response) => response.json());
  }

  getByUsername(username: string) {
    return this.http.get('/users/' + username).map((response: Response) => response.json())
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
    return this.http.get('/users/' + _id)
      .map((response: Response) => response.json());
  }

  // private helper methods
  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers });
    }
  }

  public publishData(data: any) {
    this.usuario.next(data);
  }
}
