import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { DpDatePickerModule, IDatePickerDirectiveConfig } from 'ng2-date-picker';
import { Moment } from 'moment';
import { Tournament } from '../../_models/tournament';
import { ITimeSelectConfig } from 'ng2-date-picker/time-select/time-select-config.model';
import { TournamentService } from '../../_services/tournament.service';
import { AlertService } from '../../_services/alert.service';

@Component({
  moduleId: module.id,
  templateUrl: 'tournament-definition.component.html',
})

export class TournamentDefinitionComponent implements OnInit {
  tournamentForm: FormGroup;
  tournament: Tournament;
  idClub: string = JSON.parse(localStorage.getItem('currentUser')).playerOrClubId;
  configTime: ITimeSelectConfig = {
    minutesInterval: 60,
    minutesFormat: '00'
  };

  config: IDatePickerDirectiveConfig = {
    format: 'DD/MM/YYYY',
    enableMonthSelector: true,
    showNearMonthDays: false,
    monthFormatter: (m: Moment): string => {
      return [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun',
          'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ][ m.month() ] +
        ', ' + m.year();
    },
    appendTo: 'body'
  };

  constructor(private fb: FormBuilder, private tournamentService: TournamentService,
              private alertService: AlertService) {
    this.createForm();


  }

  ngOnInit() {

  }


  createForm() {
    this.tournamentForm = this.fb.group({
      _idClubId: [ null ],
      name: [ null, Validators.required ],
      description: [ null, Validators.compose([ Validators.required, Validators.maxLength(255) ]) ],
      inicioInscripcion: [ null, Validators.required ],
      finInscripcion: [ null, Validators.required ],
      inicioCampeonato: [ null, Validators.required ],
      finCampeonato: [ null ],
      cantEquipos: [ null, Validators.required ],
      fee: [ null, Validators.required ],
      tipo: [ null, Validators.required ],
      categoria: [ null, Validators.required ]
    })
  }

  createTournament() {


    if (this.tournamentForm.valid) {

      // this.tournament = new Tournament();
      // this.tournament._idClub = this.idClub;
      // this.tournament.name = this.tournamentForm.name;
      // this.tournament.description = this.tournamentForm.description;
      // this.tournament.startInscription = this.tournamentForm.inicioInscripcion;
      // this.tournament.finishInscription = this.tournamentForm.finInscripcion;
      // this.tournament.statingDay = this.tournamentForm.inicioCampeonato;
      // this.tournament.finishDay = this.tournament.finCampeonato;
      // this.tournament.cantequipos = this.tournamentForm.cantEquipos;
      // this.tournament.inscriptionFee = this.tournamentForm.fee;
      // console.log("el form", this.tournament);

      //   this.tournamentForm._idClubId = this.idClub;

      this.tournamentService.create(this.tournamentForm).subscribe(data => {
          this.alertService.success('se guardaron los cambios', true),
            console.log('el form', this.tournamentForm);


        },
        error => {
          this.alertService.error('ha ocurrido un error', false);
        })
    }
  }

}
