import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ClubService } from '../_services/index';
import { Booking } from '../_models/booking';
import { Player } from '../_models/index';
import { PlayerService, AlertService, AuthService } from '../_services/index';

@Component({
  templateUrl: 'confirmation.html',
  providers: [ ClubService ]

})

export class ConfirmationComponent implements OnInit {

  booking: Booking;
  player: Player;
  reservaFinal: any = {};
  loading = true;
  confirmado = false;

  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute,
    private clubService: ClubService,
    private alertService: AlertService,
    private router: Router
  ) {}


  ngOnInit() {
    this.booking = ClubService.obtenerBooking();
    if (this.booking) {
      this.reservaFinal.clubId = this.booking.club._id;
      this.reservaFinal.clubName = this.booking.club.name;
      this.reservaFinal.clubAddress = this.booking.club.address.address;
      this.reservaFinal.clubPhoneNumber = this.booking.club.phoneNumber;
      this.reservaFinal.fieldId = this.booking.field.id;
      this.reservaFinal.fieldName = this.booking.field.fieldName;
      this.reservaFinal.fieldCantPlayers = this.booking.field.cantPlayers;
      this.reservaFinal.fieldFieldType = this.booking.field.fieldType;
      this.reservaFinal.fieldPrice = this.booking.field.price;
      this.reservaFinal.playingDate = this.booking.dateBook;
      this.reservaFinal.playingTime = this.booking.timeBook;
      // this.reservaFinal.paidMethod="EN SITIO";
    }
    console.log('Reserva Final ' + this.reservaFinal);
    const id: string = JSON.parse(localStorage.getItem('currentUser'))._id;
    this.getPlayer(id);
  }


  private getPlayer(id: string) {
    console.log('ESTOOO', id);
    console.log(this.player);
    this.playerService.getById(id).subscribe(player => {
      this.player = player;
      this.reservaFinal.playerName = player.name;
      this.reservaFinal.playerLastName = player.lastName;
      this.reservaFinal.playerPhoneNumber = player.phoneNumber;
      this.reservaFinal.playerId = player._id;
      console.log(this.reservaFinal);

    });
  }

  public confirm() {


    console.log('Reserva Final ' + JSON.stringify(this.reservaFinal));
    this.clubService.guardarReserva(this.reservaFinal)
      .subscribe(
        data => {
          this.confirmado = true;
          this.alertService.success('Su reserva se ha registrado con exito', true);
          this.router.navigate([ '/player/mis-reservas' ]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  public goToMisReservas() {
    this.router.navigate([ '/player/mis-reservas' ]);
  }

  public goToBusqueda() {
    this.router.navigate([ 'results' ]);
  }

}
