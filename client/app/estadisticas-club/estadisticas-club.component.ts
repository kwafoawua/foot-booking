import {Component, OnInit} from '@angular/core';


@Component({
    moduleId: module.id,
    templateUrl: 'estadisticas-club.component.html'

})

export class EstadisticasClubComponent implements OnInit{

    single: any[] = [
    {
        "name": "Germany",
        "value": 8940000
    },
    {
        "name": "USA",
        "value": 5000000
    },
    {
        "name": "France",
        "value": 7200000
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

    view: any[] = [700, 400];

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = 'Country';
    showYAxisLabel = true;
    yAxisLabel = 'Population';

    colorScheme = {
        domain: ['#0B6121', '#04B431', '#01DF3A', '#AAAAAA']
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
