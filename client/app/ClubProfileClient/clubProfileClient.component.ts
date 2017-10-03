import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { Club } from '../_models/index';
import { ClubService } from '../_services/index';
import {DpDatePickerModule, IDatePickerDirectiveConfig} from  'ng2-date-picker';
import {Moment} from "moment";
import {ITimeSelectConfig} from "ng2-date-picker/time-select/time-select-config.model";

@Component({
    moduleId: module.id,
    templateUrl: 'clubProfileClient.component.html'
})

export class ProfileClubClientComponent implements OnInit {

    club : Club ;
    zoom = 16.88;
    galery: String [];
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


    constructor(private userService: UserService, private clubService: ClubService, private route: ActivatedRoute) {
        //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        //this.isEdit = false;


    }


    ngOnInit() {
      // this.getClub(this.route.snapshot.params['id']);
        this.getClub(this.route.snapshot.params['id']);
        console.log(this.club)

    }

        private getClub (_id: string) {
        this.clubService.getResultById(_id).subscribe(club => {this.club = club, this.galery = club.galleryImg});

    }



}