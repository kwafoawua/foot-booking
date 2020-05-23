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
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var UserService = /** @class */ (function () {
    // Observable string streams
    // usuario$ = this.usuario.asObservable();
    function UserService(http) {
        this.http = http;
        this.usuario = new BehaviorSubject_1.BehaviorSubject({});
        this.usuario$ = this.usuario.asObservable();
        /* this.dataStore = { user: {} };
         this._user = <BehaviorSubject<any>>new BehaviorSubject({});
         this.user = this._user.asObservable();*/
    }
    UserService.prototype.getAll = function () {
        return this.http.get('/users', this.jwt())
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.getById = function (_id) {
        return this.http.get('/users/' + _id)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.getByUsername = function (username) {
        return this.http.get('/users/' + username).map(function (response) { return response.json(); });
        /* .subscribe(user => {
             this.usuario.next(user);
         });*/
        /* this.http.get('/users/' + username)
             .map((response: Response) => response.json()).subscribe(data =>{
              //   console.log(data);
                         this.dataStore.user = data;
                 this._user.next(Object.assign({}, this.dataStore).user);
               //  console.log(this.dataStore);
             }, error => console.log('No se pudo cargar el usuario'));*/
    };
    ;
    UserService.prototype.create = function (user) {
        return this.http.post('/users/register', user);
    };
    UserService.prototype.updateEmail = function (form) {
        return this.http.put('/users/setemail', form);
    };
    UserService.prototype.updatePassword = function (user) {
        return this.http.put('/users/setPassword', user);
    };
    UserService.prototype.update = function (user) {
        return this.http.put('/users/' + user._id, user);
    };
    UserService.prototype.delete = function (_id) {
        return this.http.delete('/users/' + _id);
    };
    UserService.prototype.getUserByCreatorId = function (_id) {
        return this.http.get('/users/' + _id)
            .map(function (response) { return response.json(); });
    };
    // private helper methods
    UserService.prototype.jwt = function () {
        // create authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    UserService.prototype.publishData = function (data) {
        this.usuario.next(data);
    };
    UserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map