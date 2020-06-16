import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable ,  BehaviorSubject } from 'rxjs';


import { User } from '../_models/user';

@Injectable()
export class UserService {
  private usuario: BehaviorSubject<any>;
  public usuario$: Observable<any>;

  constructor(private http: HttpClient) {
    this.usuario = new BehaviorSubject<any>({});
    this.usuario$ = this.usuario.asObservable();
  }

  getAll() {
    return this.http.get('/users', this.jwt());
  }

  getById(_id: string) {
    return this.http.get('/users/' + _id);
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
