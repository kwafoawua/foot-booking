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
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var GameComponent = /** @class */ (function () {
    function GameComponent() {
        this.removed = new core_1.EventEmitter();
        this.configTime = {
            minutesInterval: 60,
            minutesFormat: '00'
        };
        this.config = {
            format: 'DD/MM/YYYY',
            enableMonthSelector: true,
            showNearMonthDays: false,
            monthFormatter: function (m) {
                return ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
                    'jul', 'ago', 'sep', 'oct', 'nov', 'dic'][m.month()] +
                    ', ' + m.year();
            },
            appendTo: 'body'
        };
    }
    GameComponent.buildGame = function () {
        return new forms_1.FormGroup({
            equipo1: new forms_1.FormControl(''),
            equipo2: new forms_1.FormControl(''),
            field: new forms_1.FormControl(''),
            time: new forms_1.FormControl(''),
            day: new forms_1.FormControl(''),
            arbitro: new forms_1.FormControl('')
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], GameComponent.prototype, "index", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", forms_1.FormGroup)
    ], GameComponent.prototype, "game", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GameComponent.prototype, "removed", void 0);
    GameComponent = __decorate([
        core_1.Component({
            selector: 'game',
            moduleId: module.id,
            templateUrl: 'game.component.html',
        })
    ], GameComponent);
    return GameComponent;
}());
exports.GameComponent = GameComponent;
//# sourceMappingURL=game.component.js.map