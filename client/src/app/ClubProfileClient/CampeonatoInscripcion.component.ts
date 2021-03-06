import {Component, Input, OnInit} from '@angular/core';
import {Tournament} from '../_models/tournament';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {TournamentService} from '../_services/tournament.service';
import {AlertService} from '../_services';

@Component({
  templateUrl: './CampeonatoInscripcion.component.html',
  selector: 'camp-insc'
})

export class CampeonatoInscripcionComponent implements OnInit{
  @Input() torneo: Tournament;
  @Input() cantidad: any;
  inscripcionForm: FormGroup;
  isLinear: false;
  currentUser: any;
  public authenticated: boolean;
  name = '';
  rol = '';
  success = false;

  operationState: string;
  // debería ir a la base isAlreadyEnroll
  isAlreadyEnroll: boolean;

  ngOnInit(): void {
    this.createForm();
    this.operationState = this.route.snapshot.queryParamMap.get('paymentStatus');
    if(this.operationState !== null && this.operationState === 'success') {
      this.isAlreadyEnroll = true;
      this.alertService.success('Tu equipo se ha inscripto con éxito! Hemos recibido la confirmación de pago de Mercado Pago', false);
    } else if (this.operationState !== null && this.operationState === 'failure') {
      this.isAlreadyEnroll = false;
      this.alertService.error('Ups! Mercado Pago ha marcado la inscripción como no pagada, intentá nuevamente para inscribir a tu equipo.', false);
    }
  }

  constructor(private route: ActivatedRoute,
              private tournamentService: TournamentService,
              private fb: FormBuilder,
              private alertService: AlertService) {
            const user = JSON.parse(localStorage.getItem(('currentUser')));
            if (user) {
              this.currentUser = user;
              this.name = user.name;
              if (user.rol !== 'Club')
              {this.authenticated = true; }
              console.log('el user', user);
            }
  }


  createForm() {
    this.inscripcionForm = this.fb.group({
      idTournament: [''],
      idUser: [''],
      team: [null, [Validators.required, Validators.maxLength(20), Validators.minLength(2)]],
      name: [null, [Validators.required, Validators.maxLength(20), Validators.minLength(2)]],
      phoneNumber: [null, [Validators.required, Validators.maxLength(15), Validators.minLength(10)]],
      TyCcheckbox: [null, [Validators.required]],
    });
    this.inscripcionForm.controls.idTournament.setValue(this.route.snapshot.params.id) ;
    this.inscripcionForm.controls.idUser.setValue(this.currentUser);
  //  this.inscripcionForm.controls.idUser.setValue()
  }

  Inscribir() {
    if (this.inscripcionForm.valid) {
      {
        this.tournamentService.createInscription(this.inscripcionForm.value).subscribe((res: any) => {
            window.location.href = res.initPoint;
          },
          error => {
            this.alertService.error('Ups! No se pudo completar la inscripción al campeonato, intentá más tarde.', false);
          }
        );

      }
      this.cantidad++;

      if (this.cantidad >= this.torneo.numbersOfTeams){
        this.torneo.state = 'Completo';
        this.tournamentService.updateTournament(this.torneo).subscribe(data => {
          this.alertService.success('Se actualizaron los datos exitosamente', true);
        }, error => {
          this.alertService.error(error.error.msg, false);
        });
      }
      this.createForm();

    }
    else { this.alertService.error('Error al registrar la inscripción', this.inscripcionForm.value); }
  }

  isValidStepOne() {
    if (this.inscripcionForm.get('team').valid &&
      this.inscripcionForm.get('name').valid &&
      this.inscripcionForm.get('phoneNumber').valid) {
      return false;
    } else {
      return true;
    }
  }

  isValidStepTwo() {
    if (this.inscripcionForm.get('TyCcheckbox').valid) {
    return false;
    }
    else { return true; }
  }


}
