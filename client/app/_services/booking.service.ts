import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Booking } from '../_models/booking';

@Injectable()
export class BookingService {


    constructor(private http: Http) { }

    create(booking: Booking) {
        console.log("El Booking ");
        return this.http.post('/booking/register', booking);
    }

    getAll() {
        return this.http.get('/booking').map((response: Response) => response.json());
    }

    findAllByReferenceId(_id: string) {
        console.log(_id);
        return this.http.get('/bookings/' + _id).map((response: Response) => response.json());
    }

    update(booking: Booking, _id: string) {
        return this.http.put('/booking/' + _id, booking);
    }

    delete(_id: string) {
        return this.http.delete('/booking/' + _id);
    }
}