"use strict";
/**
 *  Esta clase toma el contro de un componente, la idea es que sea un datepicker
 *  para que pueda comparar si la fecha ingresada está dentro del rango que buscamos.
 *  Se hardcodea la fecha mínima al dia 01/01/1915 para simplificar el desarrollo.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var DateInRangeValidation = /** @class */ (function () {
    function DateInRangeValidation() {
    }
    DateInRangeValidation.validRange = function (min, max) {
        return function (c) {
            if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
                return { 'range': false };
            }
            return null;
        };
    };
    DateInRangeValidation.validMaxRange = function (max) {
        return function (c) {
            if (c.value && (isNaN(c.value) || c.value > max)) {
                return { 'range': false };
            }
            return null;
        };
    };
    DateInRangeValidation.validMinRange = function (min) {
        return function (c) {
            if (c.value && (isNaN(c.value) || c.value < min)) {
                return { 'range': false };
            }
            return null;
        };
    };
    return DateInRangeValidation;
}());
exports.DateInRangeValidation = DateInRangeValidation;
//# sourceMappingURL=dataInRange.validator.js.map