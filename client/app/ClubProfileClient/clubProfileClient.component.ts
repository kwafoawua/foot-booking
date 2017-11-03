import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { AlertService, UserService, AuthenticationService } from '../_services/index';
import { Club } from '../_models/index';
import { ClubService } from '../_services/index';
import {DpDatePickerModule, IDatePickerDirectiveConfig} from  'ng2-date-picker';
import {Moment} from "moment";
import {ITimeSelectConfig} from "ng2-date-picker/time-select/time-select-config.model";
import {Field} from "../_models/field";
import {Booking} from "../_models/booking";


@Component({
    moduleId: module.id,
    templateUrl: 'clubProfileClient.component.html'
})

export class ProfileClubClientComponent implements OnInit {


    club : Club ;
    galery: String [];
    selectedDate:any;
    selectedTime: any;
    NotanUser = true;
    model: any = {};
    username:any    ;
    password : any;
    booking1: Booking = new Booking();

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


    constructor(private autentication: AuthenticationService,
                private clubService: ClubService,
                private route: ActivatedRoute,
                private router: Router,
                 private alertService: AlertService
    ) {    }


    ngOnInit(): void{

        this.getClub(this.route.snapshot.params['id']);

    }

        private getClub (_id: string) {
        this.clubService.getResultById(_id).subscribe(club => {this.club = club, this.galery = club.galleryImg});

    }


    reservar(e:any){

        if (this.autentication.isAuthenticated()){

            this.NotanUser =false;

            if(e!=null){


                this.booking1.field=e;
                this.booking1.club=this.club;
                this.booking1.dateBook=this.selectedDate;
                this.booking1.timeBook=this.selectedTime;


                ClubService.guardarBooking(this.booking1)
                console.log(this.booking1);
                this.router.navigate(['confirmation'])
            }

        }

    else {
           console.log("No esa autenticado")
        }

    }

    login(e:any) {

        this.autentication.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.reservar(e);
                },
                error => {
                    this.alertService.error(error);

                });
    }



}