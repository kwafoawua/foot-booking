import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormGroup, Validator, Validators, NgForm} from '@angular/forms';
import { DpDatePickerModule, IDatePickerDirectiveConfig } from 'ng2-date-picker';
import { Moment } from 'moment';
import { Tournament } from '../../_models/tournament';
import { ITimeSelectConfig } from 'ng2-date-picker/time-select/time-select-config.model';
import { TournamentService } from '../../_services/tournament.service';
import { AlertService } from '../../_services/alert.service';

@Component({
  templateUrl: 'tournament-definition.component.html',
})

export class TournamentDefinitionComponent implements OnInit {

  categorias: string[];
  tipoTorneo: string[];
  prizes: string[];
  tournamentForm: FormGroup;
  tournament: Tournament;
  idClub: string = JSON.parse(localStorage.getItem('currentUser'))._id;
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
  }

  ngOnInit() {
    this.tournament = new Tournament();
    this.tipoTorneo = this.tournamentService.getTournamentType();
    this.categorias = this.tournamentService.getTournamentCategories();
  }

  createForm() {
    this.tournamentForm = this.fb.group({
      creatorClubId: [ null ],
      tournamentName: [ null, Validators.required ],
      publicationDescription: [ null, Validators.compose([ Validators.required, Validators.maxLength(255) ]) ],
      inscriptionStartDate: [ null, Validators.required ],
      inscriptionEndDate: [ null, Validators.required ],
      startDate: [ null, Validators.required ],
      endDate: [ null ],
      numbersOfTeams: [ null, Validators.required ],
      inscriptionCost: [ null, Validators.required ],
      tournamentType: [ null, Validators.required ],
      category: [ null, Validators.required ],
      termsAndConditions : [ null, Validators.compose([ Validators.required, Validators.maxLength(255) ]) ],
      prize1: [null, Validators.required],
      prize2: [null],
      prize3: [null]
    });
  }

  createTournament() {
    // agrego otros datos del capeonato
    this.tournament.creatorClubId = this.idClub;
    console.log('el formulario', this.tournament);
    this.tournamentService.create(this.tournament).subscribe(data => {
        this.alertService.success('El campeonato e registro con exito', true),
          console.log('el form', this.tournament);
      },
      error => {
      console.error(error),
        this.alertService.error('Ha ocurrido un error al registrar el torneo', false);
      }
    );
  }
  // **** LA BASE DEBE ASGINAR EL ESTADO DEL PROGRAMA COMO NUEVO ID=1****
}
