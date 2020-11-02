import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BookingService, ClubService, PlayerService} from '../_services';
import {TournamentService} from '../_services/tournament.service';

@Component({
  templateUrl: 'torneos-player.component.html'
})

export class TorneosPlayerComponent implements OnInit{
  public inscriptions: any [] = [];

  constructor(private route: ActivatedRoute,
              private playerService: PlayerService,
              private clubService: ClubService,
              private bookingService: TournamentService) {
  }

  ngOnInit() {
    const _id: string = JSON.parse(localStorage.getItem('currentUser'))._id;
    this.getBookings(_id);
  }

  private getBookings(_id: string) {
    this.bookingService.getInscriptionByUser(_id).subscribe((bookings) => {
      this.inscriptions = bookings.inscriptions;
      console.log('esto', this.inscriptions);
    });
  }

}
