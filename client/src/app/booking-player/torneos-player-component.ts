import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BookingService, ClubService, PlayerService} from '../_services';
import {TournamentService} from '../_services/tournament.service';
import { PaginationResponse } from '../_models/pagination';

@Component({
  templateUrl: 'torneos-player.component.html'
})

export class TorneosPlayerComponent implements OnInit{
  public inscriptions: any [] = [];
  pagination: PaginationResponse;

  constructor(private route: ActivatedRoute,
              private playerService: PlayerService,
              private clubService: ClubService,
              private bookingService: TournamentService) {
  }

  ngOnInit() {
    const _id: string = JSON.parse(localStorage.getItem('currentUser'))._id;
    this.getInscriptions(_id);
  }

  private getInscriptions(_id: string) {
    this.bookingService.getInscriptionByUser(_id).subscribe((data: any) => {
      const {inscriptions, ...pagination } = data;

      this.inscriptions = inscriptions;
      this.pagination = pagination;
      console.log('esto', data);
    });
  }

}
