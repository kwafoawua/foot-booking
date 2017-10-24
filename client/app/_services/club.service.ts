import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {Booking} from "../_models/booking";
import { Club } from '../_models/club';

@Injectable()
export class ClubService {

    public static  booking: Booking;

    constructor(private http: Http) { }

    create(club: any) {
        return this.http.post('/clubs/register', club);
    }

    getAll() {
        return this.http.get('/clubs').map((response: Response) => response.json());
    }

    getById(_id: string) {
        return this.http.get('/clubs/' + _id).map((response: Response) => response.json());
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