import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ClubService, BookingService } from '../_services/index';
import { Booking } from '../_models/booking';
import { Player} from '../_models/index';
import { PlayerService, AlertService, AuthService } from '../_services/index';
import {reservaFinal} from "../_models/reservaFinal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "ng2-validation";
import {MercadoPagoService} from "../_services/mercado-pago.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {TournamentService} from "../_services/tournament.service";
import {CancelTorneoDialogComponent} from "../admin-campeonato/admin-campeonato.component";

@Component({
  templateUrl: 'confirmation.html',
  providers: [ ClubService ]
})

export class ConfirmationComponent implements OnInit {
  @Output() cancelo = new EventEmitter<any>();
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
  confirmationForm: FormGroup;
  clubLinkedToMP: boolean;

  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute,
    private clubService: ClubService,
    private alertService: AlertService,
    private router: Router,
    private bookingService: BookingService,
    private fb: FormBuilder,
    private mpService: MercadoPagoService,
    public dialog: MatDialog,
  ) {
    this.createForm();
  }

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
    this.isClubLinkedToMP();
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
    if (this.confirmationForm.valid) {
      if (this.confirmationForm.get('condiciones').value === true) {
        if (this.confirmationForm.get('payMethod').value === 'payment-two') {
          this.onBuy();
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
      } else {
        this.alertService.error('Debe aceptar términos y condiciones');
      }
    } else {
      this.alertService.error('Falta ingresar datos requeridos');
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
    this.reservaFinal.externalReference = this.mpResponse.body.external_reference;
    this.loading = true;
    this.clubService.guardarReserva(this.reservaFinal) .subscribe(
      data => {
        window.location.href = this.mpResponse.body.init_point;
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      });
  }

  createForm() {
    this.confirmationForm = this.fb.group({
      condiciones: [ null, Validators.compose([ Validators.required ]) ],
      payMethod: [ null, Validators.compose([ Validators.required ]) ],
    });
  }

  public isClubLinkedToMP(){
    this.mpService.accountIsAlreadyLinked(this.booking.club._id).subscribe((res:any) => {
        this.clubLinkedToMP = res.isAlreadyLinked;
      },
      error => {
        this.alertService.error(error);
        this.clubLinkedToMP = false;
      });
  }


  openDialog() {
    const dialogRef = this.dialog.open(CancelPreReservaComponent, {
      width: '40%',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('RESULTADO', result);
      if (result) {
        this.goToBusqueda();
        this.cancelo.emit(result);
      }
    });
  }

}


@Component({
  selector: 'app-cancel-booking-dialog',
  templateUrl: 'cancel-booking-modal.html',
})
export class CancelPreReservaComponent implements OnInit{
  cancelo = true;

  constructor(
    public dialogRef: MatDialogRef<CancelPreReservaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.cancelo = true;
  }


}
