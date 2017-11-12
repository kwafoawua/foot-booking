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
import * as moment from 'moment';



@Component({
    moduleId: module.id,
    templateUrl: 'clubProfileClient.component.html'
})

export class ProfileClubClientComponent implements OnInit {


    club : Club ;
    galery: String [];
    selectedDate:any;
    selectedTime: any;
    NotanUser: Boolean;
    model: any = {};
    username:any    ;
    password : any;
    booking1: Booking = new Booking();
    date: string;
    configTime : ITimeSelectConfig = {
        minutesInterval: 60,
        minutesFormat: '00'
    };
    config: IDatePickerDirectiveConfig = {
        format: 'DD/MM/YYYY',
        enableMonthSelector: true,
        showNearMonthDays: false ,
  //      min: moment().format('L'),
        monthFormatter: (m: Moment): string => {
            return [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
                    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic' ][m.month()] +
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
    console.log(moment().format());

        this.getClub(this.route.snapshot.params['id']);

    }

        private getClub (_id: string) {
        this.clubService.getResultById(_id).subscribe(club => {this.club = club, this.galery = club.galleryImg});

    }


    reservar(e:any){

        //if (this.autentication.isAuthenticated()){
        if(localStorage.currentUser){

            this.NotanUser =false ;

            if(e!=null){

                this.booking1.field=e;
                this.booking1.club=this.club;
                this.booking1.dateBook=this.date;
                this.booking1.timeBook=this.selectedTime;


                if(ClubService.guardarBooking(this.booking1)){
                    console.log(this.booking1);
                    this.router.navigate(['confirmation'])
                }

            }

        }

    else {
            this.NotanUser = true;
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