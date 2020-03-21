/**
 *  Esta clase toma el contro de un componente, la idea es que sea un datepicker
 *  para que pueda comparar si la fecha ingresada está dentro del rango que buscamos.
 *  Se hardcodea la fecha mínima al dia 01/01/1915 para simplificar el desarrollo.
 */

import { AbstractControl, ValidatorFn } from '@angular/forms';

export class DateInRangeValidation {
    
    static validRange(min: Date, max: Date): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
                return { 'range': false };
            }
            return null;
        };
    }

    static validMaxRange(max: Date): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            if (c.value && (isNaN(c.value) || c.value > max)) {
                return { 'range': false };
            }
            return null;
        };
    }

    static validMinRange(min: Date): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            if (c.value && (isNaN(c.value) || c.value < min)) {
                return { 'range': false };
            }
            return null;
        };
    }
}