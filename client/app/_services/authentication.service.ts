import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {


    constructor(private http: Http) {
        this.getUserAuthenticated();
    }

    login(username: string, password: string) {
        return this.http.post('/users/authenticate', { username: username, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
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
            if (currentUser.rol == "Club") 
                return true;
            else
                return false;
        }
    }

    public getPlayerByUserId(){
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser != undefined) {
            return this.http.get('/player', currentUser._id).map((response:Response) => response.json());
        }
    }

}