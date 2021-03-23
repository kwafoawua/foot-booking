import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IDatePickerDirectiveConfig } from 'ng2-date-picker';
import { Moment } from 'moment';
import * as moment from 'moment';

import { PlayerService, AlertService, AuthService } from '../../_services';
import { NumberValidationService } from '../../_helpers/numberInRange.validator';
import { DateInRangeValidation } from '../../_services/dateInRange.validatorService';
import { Player } from '../../_models';
import { StorageService } from '../../_services/storage.service';


@Component({
  templateUrl: 'profile-player-edit.component.html'
})

export class ProfilePlayerEditComponent implements OnInit {
  player: Player;
  playerForm: FormGroup;
  date: any;
  selectedDate: any;
  minDate = '01/01/1915';
  letersPatter = '^[a-zA-Z]+$';
  numbersPatter = '^[0-9]+$';

  config: IDatePickerDirectiveConfig = {
    format: 'DD/MM/YYYY',
    enableMonthSelector: true,
    showNearMonthDays: false,
    monthFormatter: (m: Moment): string => {
      return [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
          'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic' ][ m.month() ] +
        ', ' + m.year();
    },
    min: '01/01/1915',
    max: this.getMaxDate(),
    appendTo: 'body'
  };


  constructor(private fb: FormBuilder,
              private playerService: PlayerService,
              private alertService: AlertService,
              private storageService: StorageService) {
  }

  ngOnInit() {
    this.createForm();
    const id = JSON.parse(localStorage.getItem('currentUser'))._id;
    this.getPlayer(id);
  }

  private createForm() {
    this.playerForm = this.fb.group({
      _id: null,
      name: [ null, Validators.required ],
      lastName: [ null, Validators.required ],
     // birthDate: [ null ],
      phoneNumber: [ null ],
     dni: [ null, NumberValidationService.validRange(1000000, 99999999) ]
    });
  }

  private getPlayer(id: string) {
    this.playerService.getPlayerByUserId(id).subscribe(player => {
      this.player = player;

      this.playerForm.setValue({
        _id: this.player._id,
        name: this.player.name,
        lastName: this.player.lastName,
     //   birthDate: this.player.birthDate ? this.formatDate(this.player.birthDate) : null,
        phoneNumber: this.player.phoneNumber || null,
      dni: this.player.dni || null,
      });
    });
  }


  updatePlayerData() {
    if (this.playerForm.valid) {
      const formValues = new FormData();

      this.playerService.update(this.playerForm.value)
        .subscribe(
          data => {
            this.alertService.success('Su perfil ha sido modificado con éxito', true);
          },
          error => {
            this.alertService.error('Upss!! Hemos experimentado un inconveniente, por favor intentá más tarde');
          }
        );
    }
  }

  private formatDate(date: any): string {
    return moment(date).format('DD/MM/YYYY');
  }

  private getMaxDate(): string {
    return moment(Date.now()).format('DD/MM/YYYY');
  }

  private stringToDate(date: string): Date {
    return new Date(date);
  }

}
