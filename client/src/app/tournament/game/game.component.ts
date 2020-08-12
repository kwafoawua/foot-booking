import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Moment } from 'moment';
import { IDatePickerDirectiveConfig } from 'ng2-date-picker';
import { ITimeSelectConfig } from 'ng2-date-picker/time-select/time-select-config.model';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Game} from '../../_models/game';

@Component({
  selector: 'game',
  templateUrl: 'game.component.html',
})

export class GameComponent implements OnInit{
  @Input()
  public index: number;

  @Input()
  public gamesForm: FormArray;

  @Output()
  public removed: EventEmitter<number> = new EventEmitter<number>();

  faseForm: FormGroup;
  //gamesForm: FormArray;

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

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(){
    this.faseForm = this.formBuilder.group({
     gamesForm: this.formBuilder.array([this.createGame()])
    });
  }

  createGame(): FormGroup{
  return this.formBuilder.group({
    equipo1: new FormControl(''),
    equipo2: new FormControl(''),
});
  }
}
