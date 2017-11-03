import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {Booking} from "../_models/booking";
import { Club } from '../_models/club';
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class ClubService {

    public static  booking: Booking;

    constructor(private http: Http) {
       /* this.dataStore = { clubs: [] };
        this._clubs = <BehaviorSubject<Club[]>>new BehaviorSubject([]);
        this.clubs = this._clubs.asObservable();*/
    }

    create(club: any) {
        return this.http.post('/clubs/register', club);
    }

    getAll() {
       /* return this.http.get('/clubs').map((response: Response) => response.json()).subscribe(data => {
            this.dataStore.clubs = data;
            this._clubs.next(Object.assign({}, this.dataStore).clubs);
        } , error => console.log('No se pueden cargar los Clubes'));*/

       return this.http.get('/clubs').map((response: Response) => response.json());
    }


    getById(_id: number | string) {
      return this.http.get('/clubs/' + _id).map((response: Response) => response.json());
      /* return this.http.get('/clubs/' + _id).map((response: Response) => response.json()).subscribe(data =>{
            let notFound = true;
            this.dataStore.clubs.forEach((club, index) => {
                if(club._id === data._id) {
                    this.dataStore.clubs[index] = data;
                    notFound = false;
                }
                });
            if(notFound) {
                this.dataStore.clubs.push(data);
            }
            this._clubs.next(Object.assign({}, this.dataStore).clubs);
            }, error => console.log('No se pudo cargar el club'));*/

    }

    getResultById(_id: string) {
        return this.http.get('/clubs/results/' + _id).map((response: Response) => response.json());
    }

    update(club: Club) {
        return this.http.put('/clubs/' + club._id, club);
    }

    delete(_id: string) {
        return this.http.delete('/clubs/' + _id);
    }

    upload(image: any) {
        return this.http.post('/uploads/', image);
    }


    //SET
    public static guardarBooking(book:Booking){
        ClubService.booking=book;
        console.log(this.booking);
        return;
    }

    //GET
    public static obtenerBooking():Booking{
        return ClubService.booking;
    }

}