import {Component, Input, OnInit} from '@angular/core';
import { ITimeSelectConfig } from 'ng2-date-picker/time-select/time-select-config.model';
import { IDatePickerDirectiveConfig } from 'ng2-date-picker';
import { Moment } from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Tournament} from '../../_models/tournament';
import { GameComponent } from '../game/game.component';
import {Fase} from '../../_models/fase';
import {TournamentService} from '../../_services/tournament.service';
import { Game } from '../../_models/game';

@Component({
  selector: 'stage',
  templateUrl: 'stage.component.html'
})

export class StageComponent implements OnInit{
  fase: any;
  registerStageForm: FormGroup;
  id_stage: string;
  esEdicion = false;
    configTime: ITimeSelectConfig = {
    minutesInterval: 60,
    minutesFormat: '00'
  };

  // Agregar metodo que devuelva el estado del torneo, e informar por HTML que el mismo esta en estado PUBLICADO!

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

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private tournamentService: TournamentService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.id_stage = this.route.snapshot.params.id;
    if (this.id_stage != null){
      console.log('la info de la get info fase' + this.tournamentService.getInfoFase());
      this.getInfoFase();
    }
    else{
      this.fase = new Fase();
    }
  }


  createForm() {
    this.registerStageForm = this.fb.group({
      startDay: [ null, Validators.required ],
      finishDay: [ null, Validators.required ],
    });
  }

  getInfoFase(){
    this.esEdicion = true;
    this.fase = this.tournamentService.getInfoFase();
    console.log(this.fase);
  }



}
