import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { BookingFilter } from '../../../_models/bookingfilter';
import { BookingService } from '../../../_services';

export interface IMatch {
  match: {
    index: number;
    id: string;
    round: string;
    hourDate: string;
    bookingId: string;
    dateToPlay: Date;
    field: any;
    fieldId: string;
    teams: [{
      name: string;
      score: string;
    },
      {
        name: string;
        score: string;
      }]
  };
  teams: any[];
  fields: any[];
  maxDate: Date;
  minDate: Date;
}

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class MatchComponent implements OnInit {
  @Input() match: any;
  @Input() teams: any;
  @Output() updateMatch = new EventEmitter<IMatch>();
  @Input() isCampeonato: boolean;
  @Input() fields: any;
  @Input() maxDate: Date;
  @Input() minDate: Date;
  tooltipText: string;
  canchaAsignadaTooltip: string;
  tieneCanchaAsignada: boolean;
  pipe = new DatePipe('es-AR'); // Use your own locale

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    if (this.match) {
      const {dateToPlay, hourDate, teams } = this.match;
      const myFormattedDate = this.pipe.transform(dateToPlay, 'shortDate');

      this.tooltipText = `Fecha de juego: ${myFormattedDate || 'Sin Definir'} \n
      Hora de juego: ${hourDate || 'Sin Definir'} \n
      Equipo Local: ${teams[0].name} - Goles: ${typeof(teams[0].score) === 'number' && teams[0].score >= 0 ?  teams[0].score : '' } \n
      Equipo Visitante: ${teams[1].name} - Goles: ${typeof(teams[1].score) === 'number' && teams[1].score >= 0 ?  teams[1].score : '' }`;

      this.canchaAsignadaTooltip = 'Partido con reserva asignada';

      this.tieneCanchaAsignada = this.isCampeonato && dateToPlay && hourDate;
    }
  }


  openDialog(match): void {
    const dialogRef = this.dialog.open(MatchUpdateDialogComponent, {
      width: '60%',
      data: {
        match: this.match,
        teams: this.teams,
        fields: this.fields,
        maxDate: this.maxDate,
        minDate: this.minDate
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateMatch.emit(result);
      }

    });
  }
}

@Component({
  selector: 'app-match-update-dialog',
  templateUrl: 'match-update-dialog.html',
})
export class MatchUpdateDialogComponent implements OnInit{
  match: any;
  inscriptions: any;
  horasDisponibles: any;
  horasOcupadas: any;
  hoursArray: string [] = [ '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00' ];
  filter: BookingFilter;
  fields: any;
  disabledScore = false;
  maxDate: Date;
  minDate: Date;
  disableField = false;
  constructor(
    public dialogRef: MatDialogRef<MatchUpdateDialogComponent>,
    private bookingService: BookingService,
    @Inject(MAT_DIALOG_DATA) public data: IMatch) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.data.match.field = this.data.fields.find(f => f._id === this.data.match.fieldId);
    this.match = this.data.match;
    this.inscriptions = this.data.teams;
    this.disabledScore = !this.match.dateToPlay || moment(this.match.dateToPlay).isSameOrAfter(new Date());
    this.disableField = moment(this.match.dateToPlay).isSameOrBefore(new Date());
    this.fields = this.data.fields;
    this.maxDate = this.data.maxDate;
    this.minDate = this.data.minDate;
    if (this.data.match.fieldId && this.data.match.dateToPlay && this.data.match.hourDate) {
      this.loadHoursValues(new Date(this.data.match.dateToPlay), this.match.hourDate);
    }
  }

  setFieldValues(field: any) {
    console.log(field);
  }

  loadHoursValues(date: Date, fixedHour?: string) {
    this.horasDisponibles = [];
    this.horasOcupadas = [];
    this.filter = new BookingFilter(this.match.field._id, date);
    this.bookingService.findAllBookingsByFieldAndDay(this.filter).subscribe(hoursBooking => {
        if (hoursBooking.length) {
          hoursBooking.forEach((booking, index) => {
            if (fixedHour !== booking.playingTime){
              this.horasOcupadas.push(booking.playingTime);
            }
          });
          this.horasDisponibles = this.hoursArray.filter(item => this.horasOcupadas.indexOf(item) < 0);
        } else {
          this.horasDisponibles = this.hoursArray;
        }
      });

  }

}
