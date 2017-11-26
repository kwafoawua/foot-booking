import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {User} from '../_models/index';
import {UserService} from '../_services/index';
import {ClubService} from '../_services/index';
import {SearchService} from '../_services/index';
import {Router} from '@angular/router';
import {ClubFilter} from "../_models/clubfilter";
import {DpDatePickerModule, IDatePickerDirectiveConfig} from  'ng2-date-picker';
import {Moment} from "moment";
import {ITimeSelectConfig} from "ng2-date-picker/time-select/time-select-config.model";


@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {

    private form: FormGroup;
    private clubfilter: ClubFilter;
    lat: number ;
    lng: number;
    zoom = 16.88;
    clubname="";
    selectedDate:any;
    selectedTime: any;
    configTime : ITimeSelectConfig = {
        minutesInterval: 60,
        minutesFormat: '00'
    };
    config: IDatePickerDirectiveConfig = {
        format: 'DD/MM/YYYY',
        enableMonthSelector: true,
        showNearMonthDays: false ,
        monthFormatter: (m: Moment): string => {
            return [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun',
                    'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ][m.month()] +
                ', ' + m.year();
        },
        appendTo: 'body'};

    constructor(private searchService: SearchService, private router: Router) {

        this.form = new FormGroup({'clubname': new FormControl('clubname')});
    }

    ngOnInit() {

        this.setCurrentPosition();

    }

    buscarClub() {
        this.buscarClubsPorFiltros();
    }

    //BUSCO POR LOS FILTROS
    private buscarClubsPorFiltros() {
        this.clubfilter = this.crearFiltros();
        this.searchService.findClubsByFilters(this.clubfilter)
            .subscribe((a) => {
                console.log('resultado', a);
                this.router.navigate(['results']);
            });
    }


    //LE PASO LOS DATOS PARA CREAR LOS FILTROS
    private crearFiltros(): ClubFilter {
        let modelform = this.form.value;
        return new ClubFilter(
           this.clubname,
        )
    }


    private setCurrentPosition() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;
                this.zoom = 16;
            });
        }
    }






}