import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';


import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { Club } from '../_models/index';
import { ClubService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'profile.component.html'
})

export class ProfileComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    club : Club;

    constructor(private userService: UserService, private clubService: ClubService, private route: ActivatedRoute) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }


    ngOnInit() {
        this.getClub(this.route.snapshot.params['id']);

    }

    deleteUser(_id: string) {
        this.userService.delete(_id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }


    private getClub (_id: string) {
        this.clubService.getById(_id).subscribe(club => {this.club = club});
    }

}