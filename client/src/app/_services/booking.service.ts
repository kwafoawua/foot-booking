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
    console.log('El Booking ');
    return this.http.post('/bookings/register', booking);
  }

  getAll() {
    return this.http.get<Booking>('/booking');
  }

  findAllByReferenceId(_id: string) {
    console.log(_id);
    return this.http.get<Booking[]>('/bookings/' + _id);
  }

  update(booking: Booking, _id: string) {
    return this.http.put<Booking>('/booking/' + _id, booking);
  }

  delete(_id: string) {
    return this.http.delete<Booking>('/booking/' + _id);
  }

  findAllHoursBookings() {
    console.log('En el servicio de findAllHoursBookings, datos de entrada:');
    return this.http.get('/bookings/getHoursToPlay');
  }

  findAllBookingsByFieldAndDay(filter: BookingFilter) {
    console.log('2- Entro al servicio con filter: ');
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
