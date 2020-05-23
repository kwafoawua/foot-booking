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
var user_service_1 = require("../../_services/user.service");
var alert_service_1 = require("../../_services/alert.service");
var ProfilePlayerInfoComponent = /** @class */ (function () {
    function ProfilePlayerInfoComponent(rout, fb, userService, alertService) {
        this.rout = rout;
        this.fb = fb;
        this.userService = userService;
        this.alertService = alertService;
        this.user = {};
    }
    ProfilePlayerInfoComponent.prototype.ngOnInit = function () {
        this.createForm();
        this.username = JSON.parse(localStorage.getItem('currentUser')).username;
        this.getUser(this.username);
    };
    ProfilePlayerInfoComponent.prototype.createForm = function () {
        this.userForm = this.fb.group({
            username: null,
            email: null,
            _id: null
        });
    };
    ProfilePlayerInfoComponent.prototype.getUser = function (username) {
        var _this = this;
        this.userService.getByUsername(username).subscribe(function (player) {
            _this.user.username = player.username;
            _this.user.email = player.email;
            _this.user._id = player._id;
            _this.userForm.setValue({
                username: _this.user.username,
                email: _this.user.email,
                _id: _this.user._id
            });
        });
    };
    ProfilePlayerInfoComponent.prototype.updateEmail = function () {
        var _this = this;
        var user = this.userForm.value;
        this.userService.updateEmail(user)
            .subscribe(function (data) {
            _this.alertService.success('El email se modificó con éxito', true);
        }, function (error) {
            _this.alertService.error(error);
        });
    };
    ProfilePlayerInfoComponent.prototype.onSubmit = function () {
        var form = this.userForm.value;
    };
    ProfilePlayerInfoComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'profile-player-info.component.html'
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            forms_1.FormBuilder,
            user_service_1.UserService,
            alert_service_1.AlertService])
    ], ProfilePlayerInfoComponent);
    return ProfilePlayerInfoComponent;
}());
exports.ProfilePlayerInfoComponent = ProfilePlayerInfoComponent;
//# sourceMappingURL=profile-player-info.component.js.map