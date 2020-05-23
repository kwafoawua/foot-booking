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
var router_1 = require("@angular/router");
var game_form_array_component_1 = require("../game/game-form-array.component");
var StageComponent = /** @class */ (function () {
    function StageComponent(router, fb) {
        this.router = router;
        this.fb = fb;
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
        this.createForm();
    }
    StageComponent.prototype.createForm = function () {
        this.registerStageForm = this.fb.group({
            name: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3)])],
            startDay: [null, forms_1.Validators.required],
            finishDay: [null, forms_1.Validators.required],
            number: [null, forms_1.Validators.required],
            games: game_form_array_component_1.GameFormArrayComponent.initGames()
        });
    };
    StageComponent = __decorate([
        core_1.Component({
            selector: 'stage',
            moduleId: module.id,
            templateUrl: 'stage.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router,
            forms_1.FormBuilder])
    ], StageComponent);
    return StageComponent;
}());
exports.StageComponent = StageComponent;
//# sourceMappingURL=stage.component.js.map