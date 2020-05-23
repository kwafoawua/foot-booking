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
var moment = require("moment");
var index_1 = require("../../_services/index");
var numberInRange_validator_1 = require("../../_helpers/numberInRange.validator");
var ProfilePlayerEditComponent = /** @class */ (function () {
    function ProfilePlayerEditComponent(fb, playerService, alertService) {
        this.fb = fb;
        this.playerService = playerService;
        this.alertService = alertService;
        this.minDate = '01/01/1915';
        this.letersPatter = '^[a-zA-Z]+$';
        this.numbersPatter = '^[0-9]+$';
        this.config = {
            format: 'DD/MM/YYYY',
            enableMonthSelector: true,
            showNearMonthDays: false,
            monthFormatter: function (m) {
                return ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
                    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'][m.month()] +
                    ', ' + m.year();
            },
            min: '01/01/1915',
            max: this.getMaxDate(),
            appendTo: 'body'
        };
    }
    ProfilePlayerEditComponent.prototype.ngOnInit = function () {
        this.createForm();
        this.userId = JSON.parse(localStorage.getItem('currentUser'))._id;
        this.getPlayer(this.userId);
    };
    ProfilePlayerEditComponent.prototype.createForm = function () {
        this.playerForm = this.fb.group({
            _id: null,
            name: [null, forms_1.Validators.required],
            lastName: [null, forms_1.Validators.required],
            birthDate: [null, forms_1.Validators.compose([
                    forms_1.Validators.required
                ])],
            phoneNumber: [null, forms_1.Validators.required],
            dni: [null, forms_1.Validators.compose([
                    forms_1.Validators.required,
                    numberInRange_validator_1.NumberValidationService.validRange(10000000, 99999999)
                ])]
        });
    };
    ProfilePlayerEditComponent.prototype.getPlayer = function (_id) {
        var _this = this;
        this.playerService.getPlayerByUserId(_id).subscribe(function (player) {
            _this.player = player;
            _this.playerForm.setValue({
                _id: _this.player._id,
                name: _this.player.name,
                lastName: _this.player.lastName,
                birthDate: _this.formatDate(_this.player.birthDate),
                phoneNumber: _this.player.phoneNumber,
                dni: _this.player.dni
            });
        });
    };
    ProfilePlayerEditComponent.prototype.updatePlayerData = function () {
        var _this = this;
        if (this.playerForm.valid) {
            var formValues = new FormData();
            this.playerService.update(this.playerForm.value)
                .subscribe(function (data) {
                _this.alertService.success('Su perfil ha sido modificado con éxito', true);
            }, function (error) {
                _this.alertService.error('Upss!! Hemos experimentado un inconveniente, por favor intenta más tarde');
            });
        }
    };
    ProfilePlayerEditComponent.prototype.formatDate = function (date) {
        return moment(date).format('DD/MM/YYYY');
    };
    ProfilePlayerEditComponent.prototype.getMaxDate = function () {
        return moment(Date.now()).format('DD/MM/YYYY');
    };
    ProfilePlayerEditComponent.prototype.stringToDate = function (date) {
        return new Date(date);
    };
    ProfilePlayerEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'profile-player-edit.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            index_1.PlayerService,
            index_1.AlertService])
    ], ProfilePlayerEditComponent);
    return ProfilePlayerEditComponent;
}());
exports.ProfilePlayerEditComponent = ProfilePlayerEditComponent;
//# sourceMappingURL=profile-player-edit.component.js.map