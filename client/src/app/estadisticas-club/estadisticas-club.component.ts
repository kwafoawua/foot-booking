import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BookingService } from '../_services/booking.service';
import * as moment from 'moment';

import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { CommentService } from '../_services/comment.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  templateUrl: 'estadisticas-club.component.html',
  styleUrls: ['./estadisticas-club.css']
})

export class EstadisticasClubComponent implements OnInit {
  single: any[] = [
    {
      'name': 'Cancha 1',
      'value': 30
    },
    {
      'name': 'Cancha 2',
      'value': 1
    },
    {
      'name': 'Cancha 3',
      'value': 20
    }
  ];
  single2: any[] = [
    {
      'name': 'Enero',
      'value': 80
    },
    {
      'name': 'Febrero',
      'value': 50
    },
    {
      'name': 'Marzo',
      'value': 72
    },
    {
      'name': 'Abril',
      'value': 89
    },
    {
      'name': 'Mayo',
      'value': 100
    },
    {
      'name': 'Junio',
      'value': 72
    },
    {
      'name': 'Julio',
      'value': 89
    },
    {
      'name': 'Agosto',
      'value': 150
    },
    {
      'name': 'Septiembre',
      'value': 72
    },
    {
      'name': 'Octubre',
      'value': 89
    },
    {
      'name': 'Noviembre',
      'value': 50
    },
    {
      'name': 'Diciembre',
      'value': 72
    }
  ];
  multi: any[] = [
    {
      'name': 'Germany',
      'series': [
        {
          'name': '2010',
          'value': 7300000
        },
        {
          'name': '2011',
          'value': 8940000
        }
      ]
    },

    {
      'name': 'USA',
      'series': [
        {
          'name': '2010',
          'value': 7870000
        },
        {
          'name': '2011',
          'value': 8270000
        }
      ]
    },

    {
      'name': 'France',
      'series': [
        {
          'name': '2010',
          'value': 5000002
        },
        {
          'name': '2011',
          'value': 5800000
        }
      ]
    }
  ];
  // view: any[] = [600, 500];
  //view1: any[] = [1200, 400];
  //  view2: any[] = [600, 500];

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
      domain: [ '#009900', '#e3bc08', '#C11B17', '#2B65EC', '#F87217', '#806517', '#7D0552', '#413839' ]
    }
  };
  autoScale = true;
  _id: string = JSON.parse(localStorage.getItem('currentUser'))._id;
  loadedReportByYear: boolean;
  loadedReportByMonth: boolean;
  loadedReportByStatus: boolean;
  loadedReportByCancha: boolean;
  cantComments: number;
  cantBookings : number;
  statusChart: any[] = [];
  bookingMonthChart: any[] = [
    {
      'name': 'Enero',
      'value': 0
    },
    {
      'name': 'Febrero',
      'value': 0
    },
    {
      'name': 'Marzo',
      'value': 0
    },
    {
      'name': 'Abril',
      'value': 0
    },
    {
      'name': 'Mayo',
      'value': 0
    },
    {
      'name': 'Junio',
      'value': 0
    },
    {
      'name': 'Julio',
      'value': 0
    },
    {
      'name': 'Agosto',
      'value': 0
    },
    {
      'name': 'Septiembre',
      'value': 0
    },
    {
      'name': 'Octubre',
      'value': 0
    },
    {
      'name': 'Noviembre',
      'value': 0
    },
    {
      'name': 'Diciembre',
      'value': 0
    }
  ];
  bookingDayChart: any[] = [{
    "name": "Reservas",
    "series": []
  },];
  anios: any[] = [
    {
      'name': '2019',
      'value': 2019
    },
    {
      'name': '2020',
      'value': 2020
    },
  ]
  months: any[] = [
    {
      'name': 'Enero',
      'value': 1
    },
    {
      'name': 'Febrero',
      'value': 2
    },
    {
      'name': 'Marzo',
      'value': 3
    },
    {
      'name': 'Abril',
      'value': 4
    },
    {
      'name': 'Mayo',
      'value': 5
    },
    {
      'name': 'Junio',
      'value': 6
    },
    {
      'name': 'Julio',
      'value': 7
    },
    {
      'name': 'Agosto',
      'value': 8
    },
    {
      'name': 'Septiembre',
      'value': 9
    },
    {
      'name': 'Octubre',
      'value': 10
    },
    {
      'name': 'Noviembre',
      'value': 11
    },
    {
      'name': 'Diciembre',
      'value': 12
    }
  ];
  fieldChart: any[] = [];
  @ViewChild('tooltipTemplate') tooltilTemplate: TemplateRef<any>;
  fieldModel: any;

  anioReportOne: any;
  anioReportTwo: any;
  monthReportTwo: any;

  formFilter: FormGroup;

  constructor(private bookingService: BookingService,
              private commentService: CommentService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.createForm()
    this.countComments();
    this.countBookings()
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
  }

  private countComments() {
    this.commentService.findAllCommentForAClub(this._id).subscribe((comments) => {
      this.cantComments = comments.length;
    });
  }

  private countBookings() {
    this.bookingService.findAllByReferenceId(this._id).subscribe((bookings) => {
      this.cantBookings = bookings.length;
    });
  }

  getReportByYear() {
    this.bookingService.findAllByReferenceId(this._id).subscribe((bookings) => {
      bookings.forEach((booking) => {
        //hacer un filtro de que si es asistido cuente la fecha.
        let dateb = moment(booking.playingDate, 'YYYY-MM-DD').toDate();
        let month = dateb.getMonth();
        let year = dateb.getFullYear();
        if (year == this.anioReportOne) {
          this.bookingMonthChart[ month ].value = this.bookingMonthChart[ month ].value + 1;
        }
      });
      this.loadedReportByYear = true;
    });
  }

  getReportByMonth() {
    this.bookingService.findAllByReferenceId(this._id).subscribe((bookings) => {
      bookings.forEach((booking) => {

        let dateb = moment(booking.playingDate, 'YYYY-MM-DD').toDate();
        let month = dateb.getMonth();
        let year = dateb.getFullYear();
        let day = dateb.getDate() - 1;
        this.bookingDayChart[0].series = this.getArrayDays(this.monthReportTwo - 1);
        if (year == this.anioReportTwo && month == this.monthReportTwo - 1) {
          this.bookingDayChart[0].series[ day ].value = this.bookingDayChart[0].series[ day ].value + 1;
        }
      });
      this.loadedReportByMonth = true;
    });
  }

  getArrayDays(month: number) {
    let days = 0;
    let result = [];

    if (month == 1) days = 27;
    if (month == 3 || month == 5 || month == 7 || month == 10) days = 30;
    if (!days) days = 31;

    for (let i = 1; i <= days; i++) {
      result.push({
        'name' : i + ' ' + this.months[month].name.substring(0, 3),
        'value' : 0
      })
    }

    return result;
  }

  getReportByState() {
    this.loadedReportByStatus = false;
    this.statusChart = [];
    this.bookingService.findAllByReferenceId(this._id).subscribe((bookings) => {
      bookings.forEach((booking) => {
        //statusChart asistido, cancelado, reservado
        let dateb = moment(booking.playingDate, 'YYYY-MM-DD').toDate();

        if (dateb >= this.dpFromDateStatus.value && dateb <= this.dpToDateStatus.value) {
          if ([ 'Asistido', 'Cancelado', 'Reservado', 'Ausente' ].indexOf(booking.status) > -1) {
            let statusC = this.statusChart;
            let statusChartIndex = statusC.findIndex(status => status.name === booking.status);
            if (statusChartIndex > -1) {
              statusC[ statusChartIndex ].value = statusC[ statusChartIndex ].value + 1;
              this.statusChart = statusC;
            } else {
              let newStatus = {
                name: booking.status,
                value: 1
              };
              statusC.push(newStatus);
              this.statusChart = statusC;
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
        let dateb = moment(booking.playingDate, 'YYYY-MM-DD').toDate();

        if (dateb >= this.dpFromDateCancha.value && dateb <= this.dpToDateCancha.value) {
          let fieldChartIndex = this.fieldChart.findIndex(field => field.name === booking.field.fieldName);
          if (fieldChartIndex > -1) {
            this.fieldChart[ fieldChartIndex ].value = this.fieldChart[ fieldChartIndex ].value + 1;
          } else {
            let newField = {
              name: booking.field.fieldName,
              value: 1
            };
            this.fieldChart.push(newField);
          }
        }
      });
      this.loadedReportByCancha = true;
    });
  }

  static onSelect(event) {
    console.log(event);
  }

  download() {
    const svg: HTMLElement = (<HTMLElement><any>document.getElementById('chart-bar-vertical').getElementsByTagName('svg')[ 0 ]);
    html2canvas(svg).then(function (canvas) {
      console.log(canvas);
      const img = canvas.toDataURL('image/png');
      let doc = new jsPDF('l', 'mm', 'a4');
      const width = doc.internal.pageSize.width;
      const height = doc.internal.pageSize.height;
      doc.text('Reservas realizadas en el año', 20, 50);

      doc.addImage(img, 'PNG', 20, 50, 160, 80);

      doc.save('reservas-realizadas-en-el-anio.pdf');
    });
  }

  download1() {
    const svg: HTMLElement = (<HTMLElement><any>document.getElementById('chart-advanced-pie').getElementsByTagName('svg')[ 0 ]);
    html2canvas(svg).then(function (canvas) {
      console.log(canvas);
      const img = canvas.toDataURL('image/png');
      let doc = new jsPDF();
      doc.text(50, 20, 'Reservas realizadas por Estado');
      // doc.addHTML(document.getElementByClassName('advanced-pie-legend-wrapper'));

      doc.addImage(img, 'JPEG', 20, 50);
      doc.save('reservas-realizadas-por-estado.pdf');
    });
  }

  download2() {
    const svg: HTMLElement = (<HTMLElement><any>document.getElementById('chart-pie-chart-canchas').getElementsByTagName('svg')[ 0 ]);
    html2canvas(svg).then(function (canvas) {
      console.log(canvas);
      const img = canvas.toDataURL('image/png');
      let doc = new jsPDF();
      doc.text(50, 20, 'Reservas realizadas por Cancha');

      doc.addImage(img, 'JPEG', 20, 50);
      doc.save('reservas-realizadas-por-cancha.pdf');
    });
  }


  onSelect(loaded: number) {
    switch (loaded) {
      case 1:
        this.loadedReportByYear = false;
        break;
      case 2:
        this.loadedReportByMonth = false;
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
}
