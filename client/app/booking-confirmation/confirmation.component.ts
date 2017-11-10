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
import {preserveWhitespacesDefault} from "@angular/compiler";


@Component({
    moduleId: module.id,
    templateUrl: 'confirmation.html'
})


export class confirmationComponent implements OnInit{

    booking:Booking;
    player:Player  ;
    reservaFinal: any = {};


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
        console.log(this.player);

        reservaFinal.club.id = this.booking.club._id;
        reservaFinal.club.name=this.booking.club.name;
        reservaFinal.club.address= this.booking.club.address.address;
        reservaFinal.club.phoneNumber=this.booking.club.phoneNumber;
        reservaFinal.field.id=this.booking.field._id;
        reservaFinal.field.name=this.booking.field.description;
        reservaFinal.field.cantPlayers=this.booking.field.cantPlayers;
        reservaFinal.field.fieldType=this.booking.field.fieldType;
        reservaFinal.field.services=this.booking.field.services;
        reservaFinal.field.price=this.booking.price;
        reservaFinal.playingDate=this.booking.dateBook;
        reservaFinal.playingTime=this.booking.timeBook;
        reservaFinal.paidMethod="EN SITIO";
        reservaFinal.player.name=this.player.name;
        reservaFinal.player.lastName=this.player.lastName;
        reservaFinal.phoneNumer=this.player.phoneNumber;
        reservaFinal.player.id=this.player._id;



    }









}