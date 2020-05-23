"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by pablo on 12/11/2017.
 */
var core_1 = require("@angular/core");
var date_fns_1 = require("date-fns");
var forms_1 = require("@angular/forms");
exports.DATE_TIME_PICKER_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return DateTimePickerComponent; }),
    multi: true
};
var DateTimePickerComponent = /** @class */ (function () {
    function DateTimePickerComponent(cdr) {
        this.cdr = cdr;
        this.onChangeCallback = function () {
        };
    }
    DateTimePickerComponent.prototype.writeValue = function (date) {
        this.date = date;
        this.dateStruct = {
            day: date_fns_1.getDate(date),
            month: date_fns_1.getMonth(date) + 1,
            year: date_fns_1.getYear(date)
        };
        this.timeStruct = {
            second: date_fns_1.getSeconds(date),
            minute: date_fns_1.getMinutes(date),
            hour: date_fns_1.getHours(date)
        };
        this.cdr.detectChanges();
    };
    DateTimePickerComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    DateTimePickerComponent.prototype.registerOnTouched = function (fn) {
    };
    DateTimePickerComponent.prototype.updateDate = function () {
        var newDate = date_fns_1.setYear(date_fns_1.setMonth(date_fns_1.setDate(this.date, this.dateStruct.day), this.dateStruct.month - 1), this.dateStruct.year);
        this.onChangeCallback(newDate);
    };
    DateTimePickerComponent.prototype.updateTime = function () {
        var newDate = date_fns_1.setHours(date_fns_1.setMinutes(date_fns_1.setSeconds(this.date, this.timeStruct.second), this.timeStruct.minute), this.timeStruct.hour);
        this.onChangeCallback(newDate);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DateTimePickerComponent.prototype, "placeholder", void 0);
    DateTimePickerComponent = __decorate([
        core_1.Component({
            selector: 'mwl-demo-utils-date-time-picker',
            template: "\n    <form class=\"form-inline\">\n      <div class=\"form-group\">\n        <div class=\"input-group\">\n          <input\n              readonly\n              class=\"form-control\"\n              [placeholder]=\"placeholder\"\n              name=\"date\"\n              [(ngModel)]=\"dateStruct\"\n              (ngModelChange)=\"updateDate()\"\n              ngbDatepicker\n              #datePicker=\"ngbDatepicker\">\n          <div class=\"input-group-addon\" (click)=\"datePicker.toggle()\">\n            <i class=\"fa fa-calendar\"></i>\n          </div>\n        </div>\n      </div>\n    </form>\n    <ngb-timepicker\n        [(ngModel)]=\"timeStruct\"\n        (ngModelChange)=\"updateTime()\"\n        [meridian]=\"true\">\n    </ngb-timepicker>\n  ",
            styles: [
                "\n      .form-group {\n        width: 100%;\n      }\n    "
            ],
            providers: [exports.DATE_TIME_PICKER_CONTROL_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef])
    ], DateTimePickerComponent);
    return DateTimePickerComponent;
}());
exports.DateTimePickerComponent = DateTimePickerComponent;
//# sourceMappingURL=date-time-picker.component.js.map