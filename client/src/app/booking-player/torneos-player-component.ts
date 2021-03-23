import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BookingService, ClubService, PlayerService} from '../_services';
import {TournamentService} from '../_services/tournament.service';
import { PaginationService } from '../_services/pagination.service';

@Component({
  templateUrl: 'torneos-player.component.html',
  styleUrls: ['booking-player.component.css']
})

export class TorneosPlayerComponent implements OnInit{
  public inscriptions: any [] = [];
  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15];
  playerId: string;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private clubService: ClubService,
    private bookingService: TournamentService,
    private paginationService: PaginationService,
  ) {
  }

  ngOnInit() {
    this.loading = true;
    const _id: string = JSON.parse(localStorage.getItem('currentUser'))._id;
    this.playerId = _id;
    this.getInscriptions();
  }

  private getInscriptions() {
    const params = this.paginationService.getRequestParams(this.page, this.pageSize);

    this.bookingService.getInscriptionByUser(this.playerId, params).subscribe((data: any) => {
      const {inscriptions, totalItems } = data;

      this.inscriptions = inscriptions;
      this.count = totalItems;
      console.log('Inscripciones', this.inscriptions);
      this.loading = false;
    });
  }

  handlePageChange(event) {
    this.page = event;
    this.getInscriptions();
  }

  handlePageSizeChange(event) {
    this.pageSize = event.value;
    this.page = 1;
    this.getInscriptions();
  }

}
