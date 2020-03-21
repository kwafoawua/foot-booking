import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Field } from '../_models/field';
import { Club } from '../_models/club';
import { UserService } from '../_services/index';
import { ClubService } from '../_services/index';
import { Booking } from '../_models/booking';
import { Player } from '../_models/index';
import { PlayerService, AlertService, AuthenticationService } from '../_services/index';
import { preserveWhitespacesDefault } from '@angular/compiler';
import { reservaFinal } from '../_models/reservaFinal';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  moduleId: module.id,
  templateUrl: 'confirmation.html',
  providers: [ ClubService ]

})

export class confirmationComponent implements OnInit {

  booking: Booking;
  player: Player;
  reservaFinal: any = {};
  loading = true;
  confirmado: Boolean = false;


  //subscription: Subscription;


  constructor(
    private playerService: PlayerService,
    private userService: UserService,
    private route: ActivatedRoute,
    private clubService: ClubService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit() {
    this.booking = ClubService.obtenerBooking();
    if (this.booking) {
      const parts: any = this.booking.dateBook.split('/');

      const mydate = new Date(parts[ 2 ], parts[ 1 ] - 1, parts[ 0 ]);
      console.log('dateObject ' + mydate);
      this.reservaFinal.clubId = this.booking.club._id;
      this.reservaFinal.clubName = this.booking.club.name;
      this.reservaFinal.clubAddress = this.booking.club.address.address;
      this.reservaFinal.clubPhoneNumber = this.booking.club.phoneNumber;
      this.reservaFinal.fieldId = this.booking.field._id;
      this.reservaFinal.fieldName = this.booking.field.fieldName;
      this.reservaFinal.fieldCantPlayers = this.booking.field.cantPlayers;
      this.reservaFinal.fieldFieldType = this.booking.field.fieldType;
      this.reservaFinal.fieldPrice = this.booking.field.price;
      this.reservaFinal.playingDate = mydate;
      this.reservaFinal.playingTime = this.booking.timeBook;
      //this.reservaFinal.paidMethod="EN SITIO";
    }

    console.log(this.booking);
    console.log('el confirmado', this.confirmado);
    console.log('Reserva Final ' + this.reservaFinal);
    const _id: string = JSON.parse(localStorage.getItem('currentUser')).playerOrClubId;
    this.getPlayer(_id);
    console.log('kakak', +this.player);

  }


  private getPlayer(_id: string) {
    console.log('ESTOOO', _id);
    console.log(this.player);
    // this.player=getUserAuthenticated();
    this.playerService.getById(_id).subscribe(player => {
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
    this.router.navigate([ 'results' ])
  }

}
