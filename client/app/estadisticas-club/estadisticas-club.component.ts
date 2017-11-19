import {Component, OnInit} from '@angular/core';


@Component({
    moduleId: module.id,
    templateUrl: 'estadisticas-club.component.html'

})

export class EstadisticasClubComponent implements OnInit{

   single: any[] = [
    {
           "name": "Asistido",
           "value": 10
       },
       {
           "name": "Pendiente de Pago",
           "value": 5
       },
       {
           "name": "Cancelado",
           "value": 5
       },
       {
           "name": "Pago Parcial",
           "value": 2
       },
       {
           "name": "Pago Total",
           "value": 10
       },
       {
           "name": "Ausente",
           "value": 5
       },
       {
           "name": "Reembolso",
           "value": 2
       },
       {
           "name": "Anulado",
           "value": 0
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

    view: any[] = [1200, 400];
    view1: any[] = [1100, 400];

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    showYAxisLabel = true;
    //yAxisLabel = 'Population';
   // yAxisLabel1 = 'Reservas';

    colorScheme = {
        domain: ['#0B6121', '#04B431', '#01DF3A', '#7ed957']
    };
    colorScheme1 = {
        domain: ['#009900','#e3bc08', '#C11B17','#2B65EC','#F87217','#806517', '#7D0552', '#413839']
    };

    // line, area
    autoScale = true;

    constructor() {
    }

    onSelect(event) {
        console.log(event);
    }




ngOnInit(){

    }
}
