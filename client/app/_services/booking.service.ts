import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Booking } from '../_models/booking';
import { BookingFilter } from "../_models/bookingfilter";

@Injectable()
export class BookingService {


    public static bookings: Booking [] = [];

    constructor(private http: Http) { }

    create(booking: Booking) {
        console.log("El Booking ");
        return this.http.post('/bookings/register', booking);
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

    findAllHoursBookings(){
        console.log("En el servicio de findAllHoursBookings, datos de entrada:");
        return this.http.get('/bookings/getHoursToPlay')
            .map((response: Response) => response.json());
    }

    findAllBookingsByFieldAndDay(filter: BookingFilter){
        console.log("2- Entro al servicio con filter: ");
        return this.http.get('/bookings/horarios/' + JSON.stringify(filter))
            .map((horarios: Response) => horarios.json());
    }

    updateBookingStatus(newStatus: any) {
        return this.http.put('/bookings/setStatus/', newStatus).map((response: Response)=> response.json());

    }
}