import { AbstractControl } from '@angular/forms';

export class PasswordValidation {

  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('password').value; // to get value in input tag
    let repeatPassword = AC.get('repeatPassword').value; // to get value in input tag
    if (password != repeatPassword) {
      console.log('false');
      AC.get('repeatPassword').setErrors({ MatchPassword: true })
    } else {
      console.log('true');
      return null
    }
  }
}
