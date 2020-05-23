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
var ProfileClubUserComponent = /** @class */ (function () {
    //user: Observable<any>;
    function ProfileClubUserComponent(fb, route, alertService, userService) {
        this.fb = fb;
        this.route = route;
        this.alertService = alertService;
        this.userService = userService;
        this.user = {};
        //this.createForm();
    }
    ProfileClubUserComponent.prototype.ngOnInit = function () {
        this.createForm();
        this.username = JSON.parse(localStorage.getItem('currentUser')).username;
        this.getUser(this.username);
    };
    ProfileClubUserComponent.prototype.getUser = function (username) {
        var _this = this;
        this.userService.getByUsername(username).subscribe(function (userClub) {
            _this.user.username = userClub.username;
            _this.user.email = userClub.email;
            _this.user._id = userClub._id;
            _this.userForm.setValue({ username: _this.user.username, email: _this.user.email, _id: _this.user._id });
        });
    };
    ProfileClubUserComponent.prototype.createForm = function () {
        //console.log(this.user.username);
        this.userForm = this.fb.group({
            username: null,
            email: null,
            _id: null
        });
    };
    ProfileClubUserComponent.prototype.updateEmail = function () {
        var _this = this;
        var user = this.userForm.value;
        console.log(user);
        this.userService.updateEmail(user)
            .subscribe(function (data) {
            _this.alertService.success('El email se modificó con éxito', true);
        }, function (error) {
            _this.alertService.error(error);
        });
    };
    ProfileClubUserComponent.prototype.onSubmit = function () {
        // console.log('Sibling1Component-received from sibling2: ' + this._sharedService.subscribeData());
        console.log('Form submitted-sibling1Form');
        var form = this.userForm.value;
        //this.searchCaseNumber = caseNumber;
    };
    ProfileClubUserComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'profile-club-user.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            router_1.ActivatedRoute,
            alert_service_1.AlertService,
            user_service_1.UserService])
    ], ProfileClubUserComponent);
    return ProfileClubUserComponent;
}());
exports.ProfileClubUserComponent = ProfileClubUserComponent;
//# sourceMappingURL=profile-club-user.component.js.map