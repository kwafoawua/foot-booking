import { AbstractControl } from '@angular/forms';

export class PasswordValidation {

  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('password').value; // to get value in input tag
    let repeatPassword = AC.get('repeatPassword').value; // to get value in input tag
    if (password != repeatPassword) {
      AC.get('repeatPassword').setErrors({ MatchPassword: true })
    } else {
      return null;
    }
  }
}
