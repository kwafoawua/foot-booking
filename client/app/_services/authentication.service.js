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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var router_1 = require("@angular/router");
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http, router) {
        this.http = http;
        this.router = router;
        this.getUserAuthenticated();
    }
    AuthenticationService.prototype.login = function (username, password) {
        console.log(username, password);
        return this.http.post('/users/authenticate', { username: username, password: password })
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var user = response.json();
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
            return user;
        });
    };
    AuthenticationService.prototype.logout = function () {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    };
    AuthenticationService.prototype.isAuthenticated = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser != undefined) {
            return true;
        }
        else {
            return false;
        }
    };
    AuthenticationService.prototype.getUserAuthenticated = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser != undefined) {
            return currentUser.username;
        }
    };
    AuthenticationService.prototype.isUserClub = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser != undefined) {
            if (currentUser.rol == 'Club')
                return true;
            else
                return false;
        }
    };
    AuthenticationService.prototype.getPlayerByUserId = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser != undefined) {
            return this.http.get('/player', currentUser._id).map(function (response) { return response.json(); });
        }
    };
    AuthenticationService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, router_1.Router])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map