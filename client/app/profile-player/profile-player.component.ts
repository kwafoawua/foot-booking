import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { Player } from '../_models/index';
import { PlayerService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'profile-player.component.html',

})

export class ProfilePlayerComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    player : Player;
    isEdit : Boolean;
    

    constructor(private userService: UserService, private playerService: PlayerService, private route: ActivatedRoute) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.isEdit = false;
    }

    ngOnInit() {
        this.getPlayer(this.route.snapshot.params['id']);
    }

    deleteUser(_id: string) {
        this.userService.delete(_id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }


    private getPlayer (_id: string) {
        this.playerService.getById(_id).subscribe(player => {this.player = player});
    }

}