import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BookingService } from '../_services/booking.service';
import * as moment from 'moment';
import { CommentService } from '../_services/comment.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {PdfModel} from './model/pdf.model';
import {TournamentService} from '../_services/tournament.service';
import {Tournament} from '../_models/tournament';

@Component({
  templateUrl: 'estadisticas-club.component.html',
  styleUrls: ['./estadisticas-club.css']
})

export class EstadisticasClubComponent implements OnInit {
  constructor(private bookingService: BookingService,
              private commentService: CommentService,
              private tournamentService: TournamentService,
              private formBuilder: FormBuilder) {
  }

  get dpFromDateStatus() {
    return this.formFilter.get('dpFromDateStatus');
  }

  get dpToDateStatus() {
    return this.formFilter.get('dpToDateStatus');
  }

  get dpFromDateCancha() {
    return this.formFilter.get('dpFromDateCancha');
  }

  get dpToDateCancha() {
    return this.formFilter.get('dpToDateCancha');
  }
  single: any[] = [
    {
      name: 'Cancha 1',
      value: 30
    },
    {
      name: 'Cancha 2',
      value: 1
    },
    {
      name: 'Cancha 3',
      value: 20
    }
  ];
  single2: any[] = [
    {
      name: 'Enero',
      value: 80
    },
    {
      name: 'Febrero',
      value: 50
    },
    {
      name: 'Marzo',
      value: 72
    },
    {
      name: 'Abril',
      value: 89
    },
    {
      name: 'Mayo',
      value: 100
    },
    {
      name: 'Junio',
      value: 72
    },
    {
      name: 'Julio',
      value: 89
    },
    {
      name: 'Agosto',
      value: 150
    },
    {
      name: 'Septiembre',
      value: 72
    },
    {
      name: 'Octubre',
      value: 89
    },
    {
      name: 'Noviembre',
      value: 50
    },
    {
      name: 'Diciembre',
      value: 72
    }
  ];
  multi: any[] = [
    {
      name: 'Germany',
      series: [
        {
          name: '2010',
          value: 7300000
        },
        {
          name: '2011',
          value: 8940000
        }
      ]
    },

    {
      name: 'USA',
      series: [
        {
          name: '2010',
          value: 7870000
        },
        {
          name: '2011',
          value: 8270000
        }
      ]
    },

    {
      name: 'France',
      series: [
        {
          name: '2010',
          value: 5000002
        },
        {
          name: '2011',
          value: 5800000
        }
      ]
    }
  ];


  // options
  options: any = {
    showLabels: true,
    explodeSlices: false,
    doughnut: false,
    showXAxis: true,
    showYAxis: true,
    gradient: false,
    showLegend: true,
    showXAxisLabel: true,
    showYAxisLabel: true,
    animations: true,
    colorScheme: {
      domain: [ '#0B6121', '#04B431', '#01DF3A', '#7ed957' ]
    },
    colorScheme1: {
      domain: [ '#e3bc08', '#009900', '#C11B17', '#F87217', '#F87217', '#806517', '#7D0552', '#413839' ]
    }
  };
  autoScale = true;
  _id: string = JSON.parse(localStorage.getItem('currentUser'))._id;
  loadedReportByYear: boolean;
  loadedReportByMonth: boolean;
  loadedReportByTournament: boolean;
  loadedReportByStatus: boolean;
  loadedReportByCancha: boolean;
  cantComments: number;
  cantBookings: number;
  statusChart: any[] = [];
  bookingMonthChart: any[] = [
    {
      name: 'Enero',
      value: 0
    },
    {
      name: 'Febrero',
      value: 0
    },
    {
      name: 'Marzo',
      value: 0
    },
    {
      name: 'Abril',
      value: 0
    },
    {
      name: 'Mayo',
      value: 0
    },
    {
      name: 'Junio',
      value: 0
    },
    {
      name: 'Julio',
      value: 0
    },
    {
      name: 'Agosto',
      value: 0
    },
    {
      name: 'Septiembre',
      value: 0
    },
    {
      name: 'Octubre',
      value: 0
    },
    {
      name: 'Noviembre',
      value: 0
    },
    {
      name: 'Diciembre',
      value: 0
    }
  ];
  bookingDayChart: any[] = [{
    name: 'Reservas',
    series: []
  }, ];
  anios: any[] = [
    {
      name: '2019',
      value: 2019
    },
    {
      name: '2020',
      value: 2020
    },
  ];
  months: any[] = [
    {
      name: 'Enero',
      value: 1
    },
    {
      name: 'Febrero',
      value: 2
    },
    {
      name: 'Marzo',
      value: 3
    },
    {
      name: 'Abril',
      value: 4
    },
    {
      name: 'Mayo',
      value: 5
    },
    {
      name: 'Junio',
      value: 6
    },
    {
      name: 'Julio',
      value: 7
    },
    {
      name: 'Agosto',
      value: 8
    },
    {
      name: 'Septiembre',
      value: 9
    },
    {
      name: 'Octubre',
      value: 10
    },
    {
      name: 'Noviembre',
      value: 11
    },
    {
      name: 'Diciembre',
      value: 12
    }
  ];
  fieldChart: any[] = [];
  tournamentChart: any[] = [];
  @ViewChild('tooltipTemplate') tooltilTemplate: TemplateRef<any>;
  fieldModel: any;

  anioReportOne: any;
  anioReportTwo: any;
  monthReportTwo: any;
  anioReportTournament: any;
  monthReportTournament: any;
  tournamentSelected: any;
  tournaments: any;

  formFilter: FormGroup;

  pdf: PdfModel;
  paidMethodSitio = 0;
  paidMethodMP = 0;

  paidMethodSitioReport = 0;
  paidMethodMPReport = 0;

  static onSelect(event) {
    console.log(event);
  }

  ngOnInit() {
    this.createForm();
    this.countComments();
    this.countBookings();
  }

  createForm(): void {
    this.formFilter = this.formBuilder.group({
      dpFromDateStatus: new FormControl(null, Validators.required),
      dpToDateStatus: new FormControl(null, Validators.required),
      dpFromDateCancha: new FormControl(null, Validators.required),
      dpToDateCancha: new FormControl(null, Validators.required)
    });
  }

  updateData() {
    this.statusChart = [ ...this.statusChart ];
    this.fieldChart = [ ...this.fieldChart ];
    this.bookingMonthChart = [ ...this.bookingMonthChart ];
    this.bookingDayChart = [ ...this.bookingDayChart ];
    this.tournamentChart = [ ...this.tournamentChart ];
  }

  private countComments() {
    this.commentService.findAllCommentForAClub(this._id, {}).subscribe((comments: any) => {
      this.cantComments = comments.totalItems;
    });
  }

  private countBookings() {
    this.bookingService.findAllByReferenceId(this._id).subscribe((bookings) => {
      this.cantBookings = bookings.filter(b => !b.isTournamentBooking).length;
      let sitio = 0;
      let mp = 0;
      bookings.forEach(booking => {
        if (!booking.isTournamentBooking) {
          if (booking.paidMethod.toLowerCase() === 'en sitio') {
            sitio++;
          } else {
            mp++;
          }
        }

      });
      if (!!this.cantBookings) {
        this.paidMethodSitio = Number(((sitio * 100) / this.cantBookings).toFixed(2));
        this.paidMethodMP = Number((100 - this.paidMethodSitio).toFixed(2));
      } else {
        this.paidMethodSitio = 0;
        this.paidMethodMP = 0;
      }
    });
  }

  getReportByYear() {
    this.bookingMonthChart.forEach(value => { value.value = 0; });
    this.bookingService.findAllByReferenceId(this._id).subscribe((bookings) => {
      bookings.forEach((booking) => {
        if (!booking.isTournamentBooking) {
          // hacer un filtro de que si es asistido cuente la fecha.
          const dateb = moment(booking.playingDate, 'YYYY-MM-DD').toDate();
          const month = dateb.getMonth();
          const year = dateb.getFullYear();
          if (year == this.anioReportOne) {
            this.bookingMonthChart[ month ].value = this.bookingMonthChart[ month ].value + 1;
          }
        }
      });
      this.loadedReportByYear = true;
    });
  }

  getReportByMonth() {
    this.bookingService.findAllByReferenceId(this._id).subscribe((bookings) => {
      let sitio = 0;
      let mp = 0;
      let total = 0;
      this.bookingDayChart[0].series = this.getArrayDays(this.monthReportTwo - 1);
      bookings.forEach((booking) => {
        if (!booking.isTournamentBooking) {
          const dateb = moment(booking.playingDate, 'YYYY-MM-DD').toDate();
          const month = dateb.getMonth();
          const year = dateb.getFullYear();
          const day = dateb.getDate() - 1;
          if (year == this.anioReportTwo && month == this.monthReportTwo - 1) {
            this.bookingDayChart[0].series[ day ].value = this.bookingDayChart[0].series[ day ].value + 1;
            total++;
            if (booking.paidMethod.toLowerCase() === 'en sitio') {
              sitio++;
            } else {
              mp++;
            }
          }
        }

      });
      if (!!total) {
        this.paidMethodSitioReport = Number(((sitio * 100) / total).toFixed(2));
        this.paidMethodMPReport = (100 - this.paidMethodSitioReport);
      }
      this.loadedReportByMonth = true;
    });
  }

  getArrayDays(month: number) {
    let days = 0;
    const result = [];

    if (month == 1) { days = 27; }
    if (month == 3 || month == 5 || month == 7 || month == 10) { days = 30; }
    if (!days) { days = 31; }

    for (let i = 1; i <= days; i++) {
      result.push({
        name : i + ' ' + this.months[month].name.substring(0, 3),
        value : 0
      });
    }

    return result;
  }

  getReportByState() {
    this.loadedReportByStatus = false;
    this.statusChart = [];
    this.bookingService.findAllByReferenceId(this._id).subscribe((bookings) => {
      bookings.forEach((booking) => {
        if (!booking.isTournamentBooking) {
          // statusChart asistido, cancelado, reservado
          const dateb = moment(booking.playingDate, 'YYYY-MM-DD').toDate();

          if (dateb >= this.dpFromDateStatus.value && dateb <= this.dpToDateStatus.value) {
            if ([ 'Asistido', 'Cancelado', 'Reservado', 'Ausente' ].indexOf(booking.status) > -1) {
              const statusC = this.statusChart;
              const statusChartIndex = statusC.findIndex(status => status.name === booking.status);
              if (statusChartIndex > -1) {
                statusC[ statusChartIndex ].value = statusC[ statusChartIndex ].value + 1;
                this.statusChart = statusC;
              } else {
                const newStatus = {
                  name: booking.status,
                  value: 1
                };
                statusC.push(newStatus);
                this.statusChart = statusC;
              }
            }
          }
        }

      });
      this.loadedReportByStatus = true;
    });
  }

  getReportByCancha() {
    this.loadedReportByCancha = false;
    this.fieldChart = [];
    this.bookingService.findAllByReferenceId(this._id).subscribe((bookings) => {
      bookings.forEach((booking) => {
        if (!booking.isTournamentBooking) {
          const dateb = moment(booking.playingDate, 'YYYY-MM-DD').toDate();

          if (dateb >= this.dpFromDateCancha.value && dateb <= this.dpToDateCancha.value) {
            const fieldChartIndex = this.fieldChart.findIndex(field => field.name === booking.field.fieldName);
            if (fieldChartIndex > -1) {
              this.fieldChart[ fieldChartIndex ].value = this.fieldChart[ fieldChartIndex ].value + 1;
            } else {
              const newField = {
                name: booking.field.fieldName,
                value: 1
              };
              this.fieldChart.push(newField);
            }
          }
        }
      });
      this.loadedReportByCancha = true;
    });
  }

  async getReportByTournament() {
    const array = [];
    this.tournamentService.getTournamentsInscriptions(this._id).subscribe((torneos: any) => {
      if (!!torneos) {
        this.tournaments = torneos.tournaments.filter(value => {
          return (value.tournament.state.toLowerCase() !== 'Nuevo' && value.tournament.state.toLowerCase() !== 'Cancelado'); });
        this.tournaments.forEach((tournament, index ) => {
          array.push({
            name: tournament.tournament.tournamentName,
            series: this.getArrayDays(this.monthReportTournament - 1)
          });
          tournament.inscriptions.forEach((inscription: any) => {
            const dateb = moment(inscription.inscriptionDate, 'YYYY-MM-DD').toDate();
            const month = dateb.getMonth();
            const year = dateb.getFullYear();
            const day = dateb.getDate() - 1;
            if (year == this.anioReportTournament && month == this.monthReportTournament - 1) {
              array[index].series[ day ].value = array[index].series[ day ].value + 1;
            }
          });
        });
        this.tournamentChart = array;
      }
    });
    this.loadedReportByTournament = true;
  }

  downloadReportYear() {
    this.pdf = new PdfModel();
    this.pdf.setNameFile('Reservas-realizadas-en-el-anio');
    this.pdf.setNameReport('Footbooking');
    this.pdf.setTitle('Reporte de las reservas realizadas en el año ' + this.anioReportOne);
    this.pdf.addIdImage('reportYear');
    this.pdf.setTotalPages(1);
    this.pdf.generate(true);
  }

  downloadReportMonth() {
    this.pdf = new PdfModel();
    this.pdf.setNameFile('Reservas-realizadas-en-mes');
    this.pdf.setNameReport('Footbooking');
    this.pdf.setTitle('Reporte de las reservas realizadas en ' +
      this.months[this.monthReportTwo - 1].name + ' del ' + this.anioReportTwo);
    this.pdf.addIdImage('reportMonth');
    this.pdf.setTotalPages(1);
    this.pdf.generate(true);
  }

  downloadReportTournament() {
    this.pdf = new PdfModel();
    this.pdf.setNameFile('Inscripciones-realizadas-por-mes-por-campeonato');
    this.pdf.setNameReport('Footbooking');
    this.pdf.setTitle('Reporte de las inscripciones realizadas en ' +
      this.months[this.monthReportTournament - 1].name + ' del ' + this.anioReportTournament);
    this.pdf.addIdImage('reportTournament');
    this.pdf.setTotalPages(1);
    this.pdf.generate(true);
  }

  downloadReportStatus() {
    const options = {year: 'numeric', month: 'long', day: 'numeric' };
    this.pdf = new PdfModel();
    this.pdf.setNameFile('Reservas-realizadas-por-estados');
    this.pdf.setNameReport('Footbooking');
    this.pdf.setTitle('Reporte de las reservas realizadas por estados');
    this.pdf.addSubtitle('Fecha desde: ' + this.dpFromDateStatus.value.toLocaleString('es-AR', options));
    this.pdf.addSubtitle('Fecha hasta: ' + this.dpToDateStatus.value.toLocaleString('es-AR', options));
    this.pdf.addIdImage('reportStatus');
    this.pdf.setTotalPages(1);
    this.pdf.generate();
  }

  downloadReportCancha() {
    const options = {year: 'numeric', month: 'long', day: 'numeric' };
    this.pdf = new PdfModel();
    this.pdf.setNameFile('Reservas-realizadas-por-cancha');
    this.pdf.setNameReport('Footbooking');
    this.pdf.setTitle('Reporte de las reservas realizadas por cancha');
    this.pdf.addSubtitle('Fecha desde: ' + this.dpFromDateCancha.value.toLocaleString('es-AR', options));
    this.pdf.addSubtitle('Fecha hasta: ' + this.dpToDateCancha.value.toLocaleString('es-AR', options));
    this.pdf.addIdImage('reportCancha');
    this.pdf.setTotalPages(1);
    this.pdf.generate();
  }

  onSelect(loaded: number) {
    switch (loaded) {
      case 1:
        this.loadedReportByYear = false;
        break;
      case 2:
        this.loadedReportByMonth = false;
        break;
      case 3:
        this.loadedReportByTournament = false;
        break;
    }
  }

  isValidReportOne() {
    return !!this.anioReportOne;
  }

  isValidReportTwo() {
    return (!!this.anioReportTwo && !!this.monthReportTwo);
  }

  isValidReportThree() {
    return (!!this.dpFromDateStatus.value && !!this.dpToDateStatus.value);
  }

  isValidReportFour() {
    return (!!this.dpFromDateCancha.value && !!this.dpToDateCancha.value);
  }

  isValidReportFive() {
    return (!!this.anioReportTournament && !!this.monthReportTournament);
  }
}
