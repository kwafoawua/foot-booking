import {Component, OnInit} from "@angular/core";
import {Booking} from "../_models/booking";
import {ActivatedRoute} from "@angular/router";
import {ClubService} from "../_services/club.service";
/**
 * Created by pablo on 8/11/2017.
 */

@Component({
    moduleId: module.id,
    templateUrl: 'booking-player.html'
})


export class bookingPlayerComponent implements OnInit{

    public booking:Booking[];

    constructor(private route: ActivatedRoute, private clubService: ClubService){

    }

    ngOnInit(){

    }

}