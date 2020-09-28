import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Booking } from '../_models/booking';
import { Club } from '../_models/club';

@Injectable()
export class ClubService {

  public static booking: Booking;

  constructor(private http: HttpClient) {
  }

  create(club: any) {
    return this.http.post('/clubs/register', club);
  }

  getAll() {
    console.log('este es el serviceeee', JSON.stringify(this.http.get('/clubs')));
    return this.http.get('/clubs');
  }


  getById(id: string) {
    return this.http.get('/clubs/' + id);
  }

  getResultById(id: string) {
    return this.http.get<Club>('/clubs/results/' + id);
  }

  update(id: string, formData: any) {
    return this.http.put('/clubs/' + id, formData);
  }

  updateFields(id: string, fields: any) {
    return this.http.put('/clubs/fields/' + id, fields);
  }

  delete(id: string) {
    return this.http.delete('/clubs/' + id);
  }

  upload(image: any) {
    return this.http.post('/uploads/', image);
  }

  getDestacados() {
    return this.http.get<Club[]>('/destacados/');
  }


  //SET
  public static guardarBooking(book: Booking) {
    ClubService.booking = book;
    console.log(this.booking);
    return true;
  }

  //GET
  public static obtenerBooking(): Booking {
    return ClubService.booking;
  }

  guardarReserva(reservaFinal: any) {
    return this.http.post('/bookings/register', reservaFinal);
  }


}
