import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClubService } from '../_services/club.service';
import { BookingService } from '../_services/booking.service';
import { PlayerService } from '../_services/player.service';
import { PaginationService } from '../_services';

@Component({
  templateUrl: 'booking-player.html',
  styleUrls: ['./booking-player.component.css']
})

export class BookingPlayerComponent implements OnInit {
  public bookings: any [] = [];
  playerId: string;
  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private clubService: ClubService,
    private bookingService: BookingService,
    private paginationService: PaginationService,
  ) {}

  ngOnInit() {
    this.loading = true;
    const _id: string = JSON.parse(localStorage.getItem('currentUser'))._id;
    this.playerId = _id;
    this.getBookings();
  }

  private getBookings() {
    const params = this.paginationService.getRequestParams(this.page, this.pageSize);

    this.bookingService.findPlayerBookings(this.playerId, params).subscribe((data: any) => {
      const {bookings, totalItems } = data;
      this.count = totalItems;
      this.bookings = bookings;
      this.loading=false;
    });
  }

  handlePageChange(event) {
    this.page = event;
    this.getBookings();
  }

  handlePageSizeChange(event) {
    this.pageSize = event.value;
    this.page = 1;
    this.getBookings();
  }
}
