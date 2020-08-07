import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Moment } from 'moment';
import { IDatePickerDirectiveConfig } from 'ng2-date-picker';
import { ITimeSelectConfig } from 'ng2-date-picker/time-select/time-select-config.model';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import {Game} from '../../_models/game';

@Component({
  selector: 'game',
  templateUrl: 'game.component.html',
})

export class GameComponent {
  @Input()
  public index: number;

  @Input()
  public games: Game[];


  @Output()
  public removed: EventEmitter<number> = new EventEmitter<number>();

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

  static buildGame() {
    return new FormGroup({
      equipo1: new FormControl(''),
      equipo2: new FormControl(''),
      field: new FormControl(''),
      time: new FormControl(''),
      day: new FormControl(''),
      arbitro: new FormControl('')
    });
  }

}
