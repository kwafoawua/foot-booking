import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';
import {ClubService} from '../_services/index'


@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

   // constructor(private userService: UserService) {
    //    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //}

    constructor(private clubService: ClubService) {

    }

    ngOnInit() {
        this.findClub();
    }


   // private loadAllUsers() {
   //     this.userService.getAll().subscribe(users => { this.users = users; });
   // }

    private findClub(){
        this.clubService.getAll();

    }



}