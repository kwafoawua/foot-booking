"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var forms_1 = require("@angular/forms");
var ValidateAllFields = /** @class */ (function () {
    function ValidateAllFields() {
    }
    ValidateAllFields.validateAllFields = function (formGroup) {
        var _this = this;
        Object.keys(formGroup.controls).forEach(function (field) {
            var control = formGroup.get(field);
            if (control instanceof forms_1.FormControl) {
                control.markAsTouched({ onlySelf: true });
            }
            else if (control instanceof forms_1.FormGroup) {
                _this.validateAllFields(control);
            }
        });
    };
    return ValidateAllFields;
}());
exports.ValidateAllFields = ValidateAllFields;
//# sourceMappingURL=validate-all-fields.js.map