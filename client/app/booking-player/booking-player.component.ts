import {Component, OnInit} from "@angular/core";
import {Booking} from "../_models/booking";
import {ActivatedRoute} from "@angular/router";
import {ClubService} from "../_services/club.service";
import {Player} from "../_models/player";
import {BookingService} from "../_services/booking.service";
import {PlayerService} from "../_services/player.service";
/**
 * Created by pablo on 8/11/2017.
 */

@Component({
    moduleId: module.id,
    templateUrl: 'booking-player.html'
})


export class bookingPlayerComponent implements OnInit{

    public bookings:any =  [];


    constructor(private route: ActivatedRoute,
                private playerService: PlayerService ,
                private clubService: ClubService,
                private bookingService: BookingService){
    }

    ngOnInit(){

    }

    private getBookings(){
        const _id: string = JSON.parse(localStorage.getItem('currentUser')).playerOrClubId;
        this.bookings= this.bookingService.findAllByReferenceId(_id);
    }

}