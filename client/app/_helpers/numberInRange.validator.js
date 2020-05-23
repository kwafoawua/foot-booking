"use strict";
/**
 *  Esta clase toma el contro de un componente, la idea es que sea un campo numérico
 *  para que pueda comparar si el numero ingresado esta dentro del rango que buscamos
 *  (min y max).
 */
Object.defineProperty(exports, "__esModule", { value: true });
var NumberValidationService = /** @class */ (function () {
    function NumberValidationService() {
    }
    NumberValidationService.validRange = function (min, max) {
        return function (c) {
            if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
                return { 'range': false };
            }
            return null;
        };
    };
    return NumberValidationService;
}());
exports.NumberValidationService = NumberValidationService;
//# sourceMappingURL=numberInRange.validator.js.map