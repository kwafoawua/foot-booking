import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { Club } from '../_models/index';
import { ClubService } from '../_services/index';


@Component({
    moduleId: module.id,
    templateUrl: 'clubProfileClient.component.html'
})

export class ProfileClubClientComponent implements OnInit {

    currentUser: User;
    users: User[] = [];
    club : Club ;
    zoom = 16.88;


    constructor(private userService: UserService, private clubService: ClubService, private route: ActivatedRoute) {
        //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        //this.isEdit = false;

    }


    ngOnInit() {
       this.getClub(this.route.snapshot.params['id']);

    }

        private getClub (_id: string) {
        this.clubService.getById(_id).subscribe(club => {this.club = club});
    }



}