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
var index_1 = require("../../_helpers/index");
var alert_service_1 = require("../../_services/alert.service");
var user_service_1 = require("../../_services/user.service");
var ProfilePlayerConfigComponent = /** @class */ (function () {
    function ProfilePlayerConfigComponent(fb, userService, alertService) {
        this.fb = fb;
        this.userService = userService;
        this.alertService = alertService;
    }
    ProfilePlayerConfigComponent.prototype.ngOnInit = function () {
        this.createForm();
        this.username = JSON.parse(localStorage.getItem('currentUser')).username;
    };
    ProfilePlayerConfigComponent.prototype.createForm = function () {
        this.passwordForm = this.fb.group({
            password: [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(8)])],
            repeatPassword: [null, forms_1.Validators.compose([forms_1.Validators.required])]
        }, { validator: index_1.PasswordValidation.MatchPassword });
    };
    ProfilePlayerConfigComponent.prototype.updatePassword = function () {
        var _this = this;
        if (this.passwordForm.valid) {
            var password = this.passwordForm.value.password;
            var user = {
                password: password,
                username: this.username
            };
            this.userService.updatePassword(user)
                .subscribe(function (data) {
                _this.alertService.success('La password se modificó con éxito', true);
            }, function (error) {
                _this.alertService.error(error);
            });
        }
        this.alertService.error('Ups! Hubo un problema en la validación, revise los campos ingresados', false);
    };
    ProfilePlayerConfigComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'profile-player-config.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            user_service_1.UserService,
            alert_service_1.AlertService])
    ], ProfilePlayerConfigComponent);
    return ProfilePlayerConfigComponent;
}());
exports.ProfilePlayerConfigComponent = ProfilePlayerConfigComponent;
//# sourceMappingURL=profile-player-config.component.js.map