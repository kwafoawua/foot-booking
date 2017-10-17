import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { User } from '../_models/index';
import { Player } from '../_models/index';
import { UserService, PlayerService, AlertService } from '../_services/index';


@Component({
    moduleId: module.id,
    templateUrl: 'profile-player.component.html',

})

export class ProfilePlayerComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    player : Player;
    isEdit : Boolean;
    model : any = {};
    

    constructor(private userService: UserService, private playerService: PlayerService, private route: ActivatedRoute, private alertService: AlertService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.editData(false);
    }

    ngOnInit() {
        this.getPlayer(this.route.snapshot.params['id']);
        this.updateForm();
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

    private getUserByCreatorId (_id: string) {
        this.userService.getUserByCreatorId(_id).subscribe(currentUser => {this.currentUser = currentUser});
    }

    editData(edit: boolean){
        this.isEdit = edit;
        console.log("" + this.isEdit);
    }

    editPlayer(){
        this.playerService.update(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Modificación exitosa', true)
                },
                error => {
                    this.alertService.error(error);
                }
            );
    }

    updateForm(): void {
        this.model = {
            idUser: this.currentUser._id
        }
    }
}