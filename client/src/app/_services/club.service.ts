import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Booking } from '../_models/booking';
import { Club } from '../_models/club';

@Injectable()
export class ClubService {

  public static booking: Booking;

  constructor(private http: HttpClient) {
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

    return this.http.get('/clubs');
  }


  getById(_id: number | string) {
    return this.http.get('/clubs/' + _id);
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
    return this.http.get<Club>('/clubs/results/' + _id);
  }

  update(_id: string, formData: any) {
    return this.http.put('/clubs/' + _id, formData);
  }

  updateFields(_id: string, fields: any) {
    return this.http.put('/clubs/fields/' + _id, fields);
  }

  delete(_id: string) {
    return this.http.delete('/clubs/' + _id);
  }

  upload(image: any) {
    return this.http.post('/uploads/', image);
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