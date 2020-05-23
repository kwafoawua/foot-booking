"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PasswordValidation = /** @class */ (function () {
    function PasswordValidation() {
    }
    PasswordValidation.MatchPassword = function (AC) {
        var password = AC.get('password').value; // to get value in input tag
        var repeatPassword = AC.get('repeatPassword').value; // to get value in input tag
        if (password != repeatPassword) {
            console.log('false');
            AC.get('repeatPassword').setErrors({ MatchPassword: true });
        }
        else {
            console.log('true');
            return null;
        }
    };
    return PasswordValidation;
}());
exports.PasswordValidation = PasswordValidation;
//# sourceMappingURL=validate-password.js.map