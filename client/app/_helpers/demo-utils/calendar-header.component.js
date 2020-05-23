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
var CalendarHeaderComponent = /** @class */ (function () {
    function CalendarHeaderComponent() {
        this.locale = 'es';
        this.viewChange = new core_1.EventEmitter();
        this.viewDateChange = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CalendarHeaderComponent.prototype, "view", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Date)
    ], CalendarHeaderComponent.prototype, "viewDate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CalendarHeaderComponent.prototype, "locale", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CalendarHeaderComponent.prototype, "viewChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CalendarHeaderComponent.prototype, "viewDateChange", void 0);
    CalendarHeaderComponent = __decorate([
        core_1.Component({
            selector: 'mwl-demo-utils-calendar-header',
            template: "\n    <div class=\"row text-center\">\n      <div class=\"col-md-4\">\n        <div class=\"btn-group\">\n          <div\n              class=\"btn btn-primary\"\n              mwlCalendarPreviousView\n              [view]=\"view\"\n              [(viewDate)]=\"viewDate\"\n              (viewDateChange)=\"viewDateChange.next(viewDate)\">\n            Anterior\n          </div>\n          <div\n              class=\"btn btn-outline-secondary\"\n              mwlCalendarToday\n              [(viewDate)]=\"viewDate\"\n              (viewDateChange)=\"viewDateChange.next(viewDate)\">\n            Hoy\n          </div>\n          <div\n              class=\"btn btn-primary\"\n              mwlCalendarNextView\n              [view]=\"view\"\n              [(viewDate)]=\"viewDate\"\n              (viewDateChange)=\"viewDateChange.next(viewDate)\">\n            Siguiente\n          </div>\n        </div>\n      </div>\n      <div class=\"col-md-4\">\n        <h3>{{ viewDate | calendarDate:(view + 'ViewTitle'):locale }}</h3>\n      </div>\n      <div class=\"col-md-4\">\n        <div class=\"btn-group\">\n          <div\n              class=\"btn btn-primary\"\n              (click)=\"viewChange.emit('month')\"\n              [class.active]=\"view === 'month'\">\n            Mes\n          </div>\n          <div\n              class=\"btn btn-primary\"\n              (click)=\"viewChange.emit('week')\"\n              [class.active]=\"view === 'week'\">\n            Semana\n          </div>\n          <!--<div-->\n          <!--class=\"btn btn-primary\"-->\n          <!--(click)=\"viewChange.emit('day')\"-->\n          <!--[class.active]=\"view === 'day'\">-->\n          <!--Day-->\n          <!--</div>-->\n        </div>\n      </div>\n    </div>\n    <br>\n  "
        })
    ], CalendarHeaderComponent);
    return CalendarHeaderComponent;
}());
exports.CalendarHeaderComponent = CalendarHeaderComponent;
//# sourceMappingURL=calendar-header.component.js.map