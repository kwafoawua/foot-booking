import {Component, Input, ViewEncapsulation} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthService } from '../_services/index';
import { Club } from '../_models/index';
import { ClubService, BookingService } from '../_services/index';
import { IDatePickerDirectiveConfig } from 'ng2-date-picker';
import { Moment } from 'moment';
import { ITimeSelectConfig } from 'ng2-date-picker/time-select/time-select-config.model';
import { Booking } from '../_models/booking';
import { BookingFilter } from '../_models/bookingfilter';
import * as moment from 'moment';
import { environment } from '../../environments/environment';


@Component({
  templateUrl: 'clubProfileClient.component.html',
  styleUrls: ['clubProfileClient.component.css'],
  encapsulation: ViewEncapsulation.None,
  selector: 'item-cancha',

})

export class ProfileClubClientComponent{
  @Input() club: Club;
  bookingFilter: BookingFilter;
  icon: '../../assets/icon/iconochico.png';
  hoursArray: string [] = [ '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00' ];
  horasOcupadas: string [][] = [];
  horasDisponibles: string [][] = [];
  galery: string[];
  uploadsBaseURL = environment.uploadsBaseURL;
  NotanUser = false;
  minDate = moment().startOf('day').toDate();
  currentUser: any;
  permiteReserva: boolean;
  booking1: Booking = new Booking();
  date: string[] = [];
  selectedTime: any[] = [];

  configTime: ITimeSelectConfig = {
    minutesInterval: 60,
    minutesFormat: '00'
  };

  config: IDatePickerDirectiveConfig = {
    format: 'DD/MM/YYYY',
    enableMonthSelector: true,
    showNearMonthDays: false,
    monthFormatter: (m: Moment): string => {
      return [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
          'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic' ][ m.month() ] +
        ', ' + m.year();
    },
    appendTo: 'body'
  };

  constructor(
    private autentication: AuthService,
    private clubService: ClubService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private bookingService: BookingService
  ) {
    const user = JSON.parse(localStorage.getItem(('currentUser')));
    if (user != null) {
      this.permiteReserva = !(user.rol === 'Club');
    } else {
      this.permiteReserva = false;
      this.NotanUser = true;
    }
    console.log('currentuser' , localStorage.getItem(('currentUser')));
  }

  reservar(field: any, i: any) {
    console.log('los datos' + this.date[ i ] + this.selectedTime[ i ]);

    if (field !== null) {
      if (this.date[ i ] !== '' || this.selectedTime[ i ] !== '') {
        const { _id, ...extrField } = field;
        const formattedField = { ...extrField, id: _id };
        this.booking1.field = formattedField;
        this.booking1.club = this.club;
        this.booking1.dateBook = this.date[ i ];
        this.booking1.timeBook = this.selectedTime[ i ];
        console.log('todos los datos');
        if (ClubService.guardarBooking(this.booking1)) {
          this.router.navigate([ 'confirmation' ]);
        }
        console.log('horas ocupadasaaaaa', this.horasOcupadas);
      } else {
        console.log('faltan los datos');
      }
    }

    //     else {this.NotanUser = true;}
    // }
  }

  public makeHoursArray() {
    console.log('Entra al makeHoursArray');
    this.bookingService.findAllHoursBookings().subscribe(hoursBooking => {
      console.log(hoursBooking);
    });
  }

  mostrameLasReservas() {
    // this.crearFiltros(this.idField,this.playingDate);
    console.log('1- Entró al mostrame las reservas. ');
    this.bookingService.findAllBookingsByFieldAndDay(this.bookingFilter)
      .subscribe(hoursBooking => {
        console.log('Ultimo- Lo que retorna la consulta: ' + (hoursBooking as any).playingTime);
      });
  }

  public crearFiltros(idField: string, playingDate: string): BookingFilter {
    console.log('1.A- Entra al crear filtros');
    return new BookingFilter(
    );
  }

  loadHoursValues(date: any, field, i) {
    this.horasDisponibles = [];
    this.horasOcupadas = [];
    this.bookingFilter = new BookingFilter(field._id, date);

    const hoursArrayForPickedDate = this.filterHourForToday(date);

    this.bookingService.findAllBookingsByFieldAndDay(this.bookingFilter)
      .subscribe(hoursBooking => {
        if (hoursBooking.length) {
          hoursBooking.forEach((booking, index) => {
            console.log(booking);
            console.log('Ultimo- Lo que retorna la consulta: ' + booking.playingTime);
            if ( this.horasOcupadas[i] === undefined ) { this.horasOcupadas[i] = []; }
            this.horasOcupadas[i].push(booking.playingTime);

            this.horasDisponibles[i] = hoursArrayForPickedDate.filter(item => this.horasOcupadas[i].indexOf(item) < 0);
          });
        } else {
          this.horasDisponibles[i] = hoursArrayForPickedDate;
        }
      });
  }

  filterHourForToday(pickedDate) {
    const tempHoursArray = [...this.hoursArray];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (pickedDate.getTime() === today.getTime()) {
      const arrayHourOffset = 9;
      const currentHour = new Date().getHours();
      if (currentHour >= 10) {
        const spliceAmount = currentHour - arrayHourOffset;
        tempHoursArray.splice(0, spliceAmount);
      }
    }
    return tempHoursArray;
  }
}
