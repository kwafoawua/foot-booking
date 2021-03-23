import { AbstractControl, Validators } from '@angular/forms';

export class TournamentDateValidator {

  static validateDates(AC: AbstractControl) {
    const inscriptionStartDate = AC.get('inscriptionStartDate').value;
    const inscriptionEndDate = AC.get('inscriptionEndDate').value;
    const startDate = AC.get('startDate').value;
    const endDate = AC.get('endDate').value;

    if (endDate < startDate) {
      AC.get('endDate').setErrors({invalidDate: true });
    } else {
      AC.get('endDate').setErrors({invalidDate: null });
      AC.get('endDate').updateValueAndValidity({ onlySelf: true, emitEvent: false });
    }
    if (startDate > endDate || startDate < inscriptionEndDate) {
      AC.get('startDate').setErrors({invalidDate: true });
    }else {
      AC.get('startDate').setErrors({invalidDate: null });
      AC.get('startDate').updateValueAndValidity({ onlySelf: true, emitEvent: false });
    }
    if (inscriptionEndDate > startDate || inscriptionEndDate < inscriptionStartDate) {
      AC.get('inscriptionEndDate').setErrors({invalidDate: true });
    } else {
      AC.get('inscriptionEndDate').setErrors({invalidDate: null });
      AC.get('inscriptionEndDate').updateValueAndValidity({ onlySelf: true, emitEvent: false });
    }
  }
}
