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
var index_1 = require("../_services/index");
var ProfilePlayerComponent = /** @class */ (function () {
    function ProfilePlayerComponent(route, alertService, router) {
        this.route = route;
        this.alertService = alertService;
        this.router = router;
    }
    ProfilePlayerComponent.prototype.ngOnInit = function () {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    };
    ProfilePlayerComponent.prototype.goToUser = function () {
        this.router.navigate(['./'], { relativeTo: this.route });
    };
    ProfilePlayerComponent.prototype.goToEdit = function () {
        this.router.navigate(['./edit'], { relativeTo: this.route });
    };
    ProfilePlayerComponent.prototype.goToConfig = function () {
        this.router.navigate(['./config'], { relativeTo: this.route });
    };
    ProfilePlayerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'profile-player.component.html',
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            index_1.AlertService,
            router_1.Router])
    ], ProfilePlayerComponent);
    return ProfilePlayerComponent;
}());
exports.ProfilePlayerComponent = ProfilePlayerComponent;
//# sourceMappingURL=profile-player.component.js.map