/**
 * Created by pablo on 14/10/2017.
 */

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Field} from "../_models/field";
import {Club} from "../_models/club";
import { UserService } from '../_services/index';
import { ClubService } from '../_services/index';
import {Booking} from "../_models/booking";
import { Player } from '../_models/index';
import {PlayerService, AlertService,AuthenticationService } from '../_services/index';


@Component({
    moduleId: module.id,
    templateUrl: 'confirmation.html'
})


export class confirmationComponent implements OnInit{

    booking:Booking;
    player:any  ;


    constructor(private playerService: PlayerService, userService: UserService, private route: ActivatedRoute, private clubService: ClubService){

       }

    ngOnInit(){
        this.booking=ClubService.obtenerBooking();

        const _id: string = JSON.parse(localStorage.getItem('currentUser')).playerOrClubId;
        this.getPlayer(_id);
        console.log("kakak",+this.player);
    }


    private getPlayer (_id: string) {
        console.log("ESTOOO",_id);
        this.playerService.getById(_id).subscribe(player => {this.player = player});
    }









}