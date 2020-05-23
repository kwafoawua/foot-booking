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
var router_1 = require("@angular/router");
var user_service_1 = require("../../_services/user.service");
var forms_1 = require("@angular/forms");
var index_1 = require("../../_helpers/index");
var alert_service_1 = require("../../_services/alert.service");
var ProfileClubPasswordComponent = /** @class */ (function () {
    function ProfileClubPasswordComponent(fb, route, alertService, userService) {
        this.fb = fb;
        this.route = route;
        this.alertService = alertService;
        this.userService = userService;
    }
    ProfileClubPasswordComponent.prototype.ngOnInit = function () {
        this.createForm();
        this.username = JSON.parse(localStorage.getItem('currentUser')).username;
    };
    ProfileClubPasswordComponent.prototype.createForm = function () {
        this.passwordForm = this.fb.group({
            password: [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(8)])],
            repeatPassword: [null, forms_1.Validators.compose([forms_1.Validators.required])]
        }, {
            validator: index_1.PasswordValidation.MatchPassword // your validation method
        });
    };
    ProfileClubPasswordComponent.prototype.updatePassword = function () {
        var _this = this;
        var password = this.passwordForm.value.password;
        var user = {
            password: password,
            username: this.username
        };
        console.log(password);
        console.log('coso');
        this.userService.updatePassword(user)
            .subscribe(function (data) {
            _this.alertService.success('La password se modificó con éxito', true);
        }, function (error) {
            _this.alertService.error(error);
        });
    };
    ProfileClubPasswordComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'profile-club-password.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            router_1.ActivatedRoute,
            alert_service_1.AlertService,
            user_service_1.UserService])
    ], ProfileClubPasswordComponent);
    return ProfileClubPasswordComponent;
}());
exports.ProfileClubPasswordComponent = ProfileClubPasswordComponent;
//# sourceMappingURL=profile-club-password.component.js.map