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
var authentication_service_1 = require("../_services/authentication.service");
var router_1 = require("@angular/router");
var SiteHeaderComponent = /** @class */ (function () {
    function SiteHeaderComponent(auth, router) {
        this.auth = auth;
        this.router = router;
        auth.isAuthenticated();
        auth.isUserClub();
    }
    SiteHeaderComponent.prototype.ngOnInit = function () {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.currentUser != undefined) {
            this.username = this.currentUser.username;
        }
    };
    SiteHeaderComponent.prototype.goToProfile = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log(currentUser.rol);
        if (currentUser.rol == 'Club') {
            this.router.navigate(['/club/profile']);
        }
        else {
            this.router.navigate(['/profile-player', currentUser.playerOrClubId]);
        }
    };
    SiteHeaderComponent.prototype.goToMisReservas = function () {
        this.router.navigate(['/player/mis-reservas']);
    };
    SiteHeaderComponent.prototype.goToDashboard = function () {
        this.router.navigate(['/club/estadisticas']);
    };
    SiteHeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-site-header',
            moduleId: module.id,
            templateUrl: 'site-header.component.html',
            styleUrls: ['site-header.component.css']
        }),
        __metadata("design:paramtypes", [authentication_service_1.AuthenticationService, router_1.Router])
    ], SiteHeaderComponent);
    return SiteHeaderComponent;
}());
exports.SiteHeaderComponent = SiteHeaderComponent;
//# sourceMappingURL=site-header.component.js.map