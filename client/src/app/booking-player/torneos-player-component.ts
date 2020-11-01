import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BookingService, ClubService, PlayerService} from '../_services';

@Component({
  templateUrl: 'torneos-player.component.html'
})

export class TorneosPlayerComponent implements OnInit{
  public bookings: any [] = [];

  constructor(private route: ActivatedRoute,
              private playerService: PlayerService,
              private clubService: ClubService,
              private bookingService: BookingService) {
  }

  ngOnInit() {
    const _id: string = JSON.parse(localStorage.getItem('currentUser'))._id;
    this.getBookings(_id);
  }

  private getBookings(_id: string) {
    this.bookingService.findAllByReferenceId(_id).subscribe((bookings) => {
      this.bookings = bookings;
      console.log('esto', this.bookings);
    });
  }


}
