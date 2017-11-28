import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BookingService} from "../_services/booking.service";
import moment = require("moment");
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

import {CommentService} from "../_services/comment.service";


@Component({
    moduleId: module.id,
    templateUrl: 'estadisticas-club.component.html'

})

export class EstadisticasClubComponent implements OnInit{

   single: any[] = [
    {
           "name": "Cancha 1",
           "value": 30
       },
       {
           "name": "Cancha 2",
           "value": 1
       },
       {
           "name": "Cancha 3",
           "value": 20
       }
];
    single2: any[] = [
        {
            "name": "Enero",
            "value": 80
        },
        {
            "name": "Febrero",
            "value": 50
        },
        {
            "name": "Marzo",
            "value": 72
        },
        {
            "name": "Abril",
            "value": 89
        },
        {
            "name": "Mayo",
            "value": 100
        },
        {
            "name": "Junio",
            "value": 72
        },
        {
            "name": "Julio",
            "value": 89
        },
        {
            "name": "Agosto",
            "value": 150
        },
        {
            "name": "Septiembre",
            "value": 72
        },
        {
            "name": "Octubre",
            "value": 89
        },
        {
            "name": "Noviembre",
            "value": 50
        },
        {
            "name": "Diciembre",
            "value": 72
        }
    ];
    multi: any[] = [
        {
            "name": "Germany",
            "series": [
                {
                    "name": "2010",
                    "value": 7300000
                },
                {
                    "name": "2011",
                    "value": 8940000
                }
            ]
        },

        {
            "name": "USA",
            "series": [
                {
                    "name": "2010",
                    "value": 7870000
                },
                {
                    "name": "2011",
                    "value": 8270000
                }
            ]
        },

        {
            "name": "France",
            "series": [
                {
                    "name": "2010",
                    "value": 5000002
                },
                {
                    "name": "2011",
                    "value": 5800000
                }
            ]
        }
    ];
   // view: any[] = [600, 500];
 //   view1: any[] = [1200, 400];
  //  view2: any[] = [600, 500];
    // options
    options : any = {
        showLabels : true,
        explodeSlices : false,
        doughnut : false,
        showXAxis: true,
        showYAxis:  true,
        gradient: false,
        showLegend: true,
        showXAxisLabel: true,
        showYAxisLabel: true,
        animations: true,
        colorScheme : {
            domain: ['#0B6121', '#04B431', '#01DF3A', '#7ed957']
        },
        colorScheme1: {
            domain: ['#009900','#e3bc08', '#C11B17','#2B65EC','#F87217','#806517', '#7D0552', '#413839']
        }
    };
    autoScale = true;
    _id: string = JSON.parse(localStorage.getItem('currentUser')).playerOrClubId;
    loaded: Boolean;
    cantComments : number;
    statusChart : any[] = [];
    bookingMonthChart: any[] = [
        {
            "name": "Enero",
            "value": 0
        },
        {
            "name": "Febrero",
            "value": 0
        },
        {
            "name": "Marzo",
            "value": 0
        },
        {
            "name": "Abril",
            "value": 0
        },
        {
            "name": "Mayo",
            "value": 0
        },
        {
            "name": "Junio",
            "value": 0
        },
        {
            "name": "Julio",
            "value": 0
        },
        {
            "name": "Agosto",
            "value": 0
        },
        {
            "name": "Septiembre",
            "value": 0
        },
        {
            "name": "Octubre",
            "value": 0
        },
        {
            "name": "Noviembre",
            "value": 0
        },
        {
            "name": "Diciembre",
            "value": 0
        }
    ];
    fieldChart : any[] = [];
    @ViewChild('tooltipTemplate') tooltilTemplate: TemplateRef<any>;
    fieldModel: any;



    constructor(private bookingService : BookingService, private commentService : CommentService) {
    }

    ngOnInit(){
        this.getBookings(this._id);
        this.countComments(this._id);
    }

    updateData() {
        this.statusChart = [...this.statusChart];
        this.fieldChart = [...this.fieldChart];
        this.bookingMonthChart = [... this.bookingMonthChart];

    }

    private countComments(_id) {
        this.commentService.findAllCommentForAClub(_id).subscribe( (comments) => {
            this.cantComments = comments.length;
        });
    }

    private getBookings(_id: string){
        let finalizado = false;
        this.bookingService.findAllByReferenceId(_id).subscribe((bookings)=>{
            console.log(bookings);
            bookings.forEach((booking) => {
                //statusChart asistido, cancelado, reservado
                if(["Asistido", "Cancelado", "Pago Total"].indexOf(booking.status) > -1) {
                    let statusC = this.statusChart;
                    let statusChartIndex = statusC.findIndex(status => status.name === booking.status);
                    if( statusChartIndex> -1){
                        statusC[statusChartIndex].value = statusC[statusChartIndex].value +1;
                        this.statusChart = statusC;
                    }else {
                        let newStatus = {
                            name: booking.status,
                            value: 1
                        };
                        statusC.push(newStatus);
                        this.statusChart = statusC;
                    }
                }


                //fieldChart
                let fieldChartIndex = this.fieldChart.findIndex(field => field.name === booking.field.fieldName);
                if( fieldChartIndex> -1){
                    this.fieldChart[fieldChartIndex].value = this.fieldChart[fieldChartIndex].value +1;
                }else {
                    let newField = {
                        name: booking.field.fieldName,
                        value: 1
                    };
                    this.fieldChart.push(newField);
                }

            //hacer un filtro de que si es asistido cuente la fecha.
                let playingDate : string = booking.playingDate;
                let dateb = moment(booking.playingDate, 'YYYY-MM-DD').toDate();
                let month = dateb.getMonth();
                this.bookingMonthChart[month].value = this.bookingMonthChart[month].value +1;
                //bookingMonthChart

                console.log(dateb.getMonth());
                console.log(dateb);
                console.log(this.fieldChart);
                console.log(this.statusChart);
                console.log(this.bookingMonthChart);
                finalizado = true;
            });
            this.loaded = finalizado;
        });
    }

    static onSelect(event) {
        console.log(event);
    }

    download(){
        const svg: HTMLElement  = (<HTMLElement> <any>document.getElementById('chart-bar-vertical').getElementsByTagName('svg')[0]);
        html2canvas(svg).then(function(canvas) {
            console.log(canvas);
            const img = canvas.toDataURL("image/png");
            let doc = new jsPDF();
            doc.text(50,100,'Reservas realizadas en el año');

            doc.addImage(img,'JPEG',5,20);
            doc.save('reservas-realizadas-en-el-anio.pdf');
        });
    }

    download1(){
        const svg: HTMLElement  = (<HTMLElement> <any>document.getElementById('chart-advanced-pie').getElementsByTagName('svg')[0]);
        html2canvas(svg).then(function(canvas) {
            console.log(canvas);
            const img = canvas.toDataURL("image/png");
            let doc = new jsPDF();
            doc.text(50,100,'Reservas realizadas por Estado');
           // doc.addHTML(document.getElementByClassName('advanced-pie-legend-wrapper'));


            doc.addImage(img,'JPEG',5,20);
            doc.save('reservas-realizadas-por-estado.pdf');
        });
    }

    download2(){
        const svg: HTMLElement  = (<HTMLElement> <any>document.getElementById('chart-pie-chart-canchas').getElementsByTagName('svg')[0]);
        html2canvas(svg).then(function(canvas) {
            console.log(canvas);
            const img = canvas.toDataURL("image/png");
            let doc = new jsPDF();
            doc.text(50,100,'Reservas realizadas por Cancha');

            doc.addImage(img,'JPEG',5,20);
            doc.save('reservas-realizadas-por-cancha.pdf');
        });
    }

}
