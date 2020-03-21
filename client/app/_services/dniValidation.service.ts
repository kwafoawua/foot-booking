/**
 *  Esta clase toma el contro de un componente, la idea es que sea un campo numérico
 *  para que pueda comparar si el numero ingresado esta dentro del rango que buscamos
 *  (min y max).
 */

import { AbstractControl, ValidatorFn } from '@angular/forms';

export class DNIValidationService {
  static validRange(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): { [ key: string ]: boolean } | null => {
      if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
        return { 'range': false };
      }
      return null;
    };
  }
}
