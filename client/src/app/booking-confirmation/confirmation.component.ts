import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ClubService, BookingService } from '../_services/index';
import { Booking } from '../_models/booking';
import { Player} from '../_models/index';
import { PlayerService, AlertService, AuthService } from '../_services/index';
import {reservaFinal} from "../_models/reservaFinal";

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
  mercadoPagoData: any = {};
  mpResponse: any = {};
  mercadoPagoOpt: string
  operationState: string;
  permiteMercadoPago: boolean;

  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute,
    private clubService: ClubService,
    private alertService: AlertService,
    private router: Router,
    private bookingService: BookingService
  ) {}


  ngOnInit() {
    this.operationState = this.route.snapshot.queryParamMap.get('status');
    if (this.operationState !== null && this.operationState === 'approved') {
      this.confirmado = true;
      this.alertService.success('Su reserva se ha registrado con exito', true);
      this.router.navigate(['/player/mis-reservas']);
    }
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
    this.permiteMercadoPago = this.booking.club.mercadoPago;
    console.log('veo el club del booking', this.booking.club.mercadoPago);
    console.log('Reserva Final ' + JSON.stringify(this.reservaFinal));
    const id: string = JSON.parse(localStorage.getItem('currentUser'))._id;
    this.getPlayer(id);
    this.getMercadoPagoCheckout();
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

  private getMercadoPagoCheckout() {
    this.mercadoPagoData.title = `Reserva en club ${this.reservaFinal.clubName}`;
    this.mercadoPagoData.description = `Cancha: ${this.reservaFinal.fieldName} - Fecha: ${this.reservaFinal.playingDate} Hora: ${this.reservaFinal.playingTime}`;
    this.mercadoPagoData.unitPrice = parseFloat(this.reservaFinal.fieldPrice);
    this.mercadoPagoData.successURL = "http://localhost:4200/confirmation";
    this.mercadoPagoData.failureURL = "http://localhost:4200/confirmation?state=error";
    this.bookingService.generateMercadoPagoCheckout(this.mercadoPagoData)
      .subscribe(
        mpData => {
          this.mpResponse = mpData;
          console.log(`la data de mercado de pago: ${JSON.stringify(this.mpResponse)}`)
        }
      );
  }

  public confirm() {
    if ("payment-two" === this.mercadoPagoOpt) {
      this.onBuy()
    } else {
      console.log('Reserva Final ' + JSON.stringify(this.reservaFinal));
      this.clubService.guardarReserva(this.reservaFinal)
        .subscribe(
          data => {
            this.confirmado = true;
            this.alertService.success('Su reserva se ha registrado con exito', true);
            this.router.navigate(['/player/mis-reservas']);
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          });
    }
  }

  public goToMisReservas() {
    this.router.navigate([ '/player/mis-reservas' ]);
  }

  public goToBusqueda() {
    this.router.navigate([ 'results' ]);
  }

  public onBuy() {
    this.reservaFinal.fee = this.booking.field.price;
    this.clubService.guardarReserva(this.reservaFinal) .subscribe(
      data => {
        window.location.href = this.mpResponse.body.init_point;
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      });
  }

}
