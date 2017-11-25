import {Component, OnInit} from '@angular/core';
import {BookingService} from "../_services/booking.service";
import moment = require("moment");


@Component({
    moduleId: module.id,
    templateUrl: 'estadisticas-club.component.html'

})

export class EstadisticasClubComponent implements OnInit{

//    single: any[] = [
//     {
//            "name": "Asistido",
//            "value": 10
//        },
//        {
//            "name": "Pendiente de Pago",
//            "value": 5
//        },
//        {
//            "name": "Cancelado",
//            "value": 5
//        },
//        {
//            "name": "Pago Parcial",
//            "value": 2
//        },
//        {
//            "name": "Pago Total",
//            "value": 10
//        },
//        {
//            "name": "Ausente",
//            "value": 5
//        },
//        {
//            "name": "Reembolso",
//            "value": 2
//        },
//        {
//            "name": "Anulado",
//            "value": 0
//        }
// ];
//     single2: any[] = [
//         {
//             "name": "Enero",
//             "value": 80
//         },
//         {
//             "name": "Febrero",
//             "value": 50
//         },
//         {
//             "name": "Marzo",
//             "value": 72
//         },
//         {
//             "name": "Abril",
//             "value": 89
//         },
//         {
//             "name": "Mayo",
//             "value": 100
//         },
//         {
//             "name": "Junio",
//             "value": 72
//         },
//         {
//             "name": "Julio",
//             "value": 89
//         },
//         {
//             "name": "Agosto",
//             "value": 150
//         },
//         {
//             "name": "Septiembre",
//             "value": 72
//         },
//         {
//             "name": "Octubre",
//             "value": 89
//         },
//         {
//             "name": "Noviembre",
//             "value": 50
//         },
//         {
//             "name": "Diciembre",
//             "value": 72
//         }
//     ];
//     multi: any[] = [
//         {
//             "name": "Germany",
//             "series": [
//                 {
//                     "name": "2010",
//                     "value": 7300000
//                 },
//                 {
//                     "name": "2011",
//                     "value": 8940000
//                 }
//             ]
//         },
//
//         {
//             "name": "USA",
//             "series": [
//                 {
//                     "name": "2010",
//                     "value": 7870000
//                 },
//                 {
//                     "name": "2011",
//                     "value": 8270000
//                 }
//             ]
//         },
//
//         {
//             "name": "France",
//             "series": [
//                 {
//                     "name": "2010",
//                     "value": 5000002
//                 },
//                 {
//                     "name": "2011",
//                     "value": 5800000
//                 }
//             ]
//         }
//     ];
    view: any[] = [1200, 400];
    view1: any[] = [1200, 400];
    // options
    options : any = {
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

    constructor(private bookingService : BookingService) {
    }

    ngOnInit(){
        this.getBookings(this._id);
        setInterval(this.updateData.bind(this), 1000);

    }
    updateData() {
        this.statusChart = [...this.statusChart];
        this.fieldChart = [...this.fieldChart];
        this.bookingMonthChart = [... this.bookingMonthChart];
    }

    private getBookings(_id: string){
        this.bookingService.findAllByReferenceId(_id).subscribe((bookings)=>{
            console.log(bookings);
            bookings.forEach((booking) => {
                //statusChart asistido, cancelado, reservado
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
                let playingDate : string = booking.playinDate;
                let dateb = moment(playingDate).toDate();
                let month = dateb.getMonth();
                this.bookingMonthChart[month].value = this.bookingMonthChart[month].value +1;
                //bookingMonthChart

                console.log(dateb.getMonth());
                console.log(this.fieldChart);
                console.log(this.statusChart);
            });
        });
    }

    static onSelect(event) {
        console.log(event);
    }

}
