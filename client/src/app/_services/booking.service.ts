import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Booking } from '../_models/booking';
import { BookingFilter } from '../_models/bookingfilter';

@Injectable()
export class BookingService {


  public static bookings: Booking [] = [];

  constructor(private http: HttpClient) {
  }

  create(booking: Booking) {
    return this.http.post('/bookings/register', booking);
  }

  getAll() {
    return this.http.get<Booking>('/booking');
  }

  findAllByReferenceId(_id: string) {
    return this.http.get<Booking[]>('/bookings/' + _id);
  }

  findPlayerBookings(_id: string, params) {
    return this.http.get('/bookings/player/' + _id, {params});
  }

  update(booking: Booking, _id: string) {
    return this.http.put<Booking>('/booking/' + _id, booking);
  }

  delete(_id: string) {
    return this.http.delete<Booking>('/booking/' + _id);
  }

  findAllHoursBookings() {
    return this.http.get('/bookings/getHoursToPlay');
  }

  findAllBookingsByFieldAndDay(filter: BookingFilter) {
    return this.http.get<Booking[]>('/bookings/horarios/' + JSON.stringify(filter));
  }

  updateBookingStatus(newStatus: any) {
    return this.http.put('/bookings/setStatus/', newStatus);

  }

  generateMercadoPagoCheckout(bookingData: any){
    console.log(`en el llamado a mp con datos ${JSON.stringify(bookingData)}`)
    return this.http.post('/mercadopago/generatePreference', bookingData);

  }

}
