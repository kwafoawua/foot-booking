import { Component, OnInit } from '@angular/core';
import { ITimeSelectConfig } from 'ng2-date-picker/time-select/time-select-config.model';
import { IDatePickerDirectiveConfig } from 'ng2-date-picker';
import { Moment } from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameFormArrayComponent } from '../game/game-form-array.component';

@Component({
  selector: 'stage',
  templateUrl: 'stage.component.html'
})

export class StageComponent {
  registerStageForm: FormGroup;

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

  constructor(
    private router: Router,
    private fb: FormBuilder) {
    this.createForm();
  }


  createForm() {
    this.registerStageForm = this.fb.group({
      startDay: [ null, Validators.required ],
      finishDay: [ null, Validators.required ],
      games: GameFormArrayComponent.initGames()
    });
  }


}
