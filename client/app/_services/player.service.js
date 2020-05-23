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
var PlayerService = /** @class */ (function () {
    function PlayerService(http) {
        this.http = http;
    }
    PlayerService.prototype.create = function (player) {
        console.log('El player ');
        return this.http.post('/players/register', player);
    };
    PlayerService.prototype.getAll = function () {
        return this.http.get('/players').map(function (response) { return response.json(); });
    };
    PlayerService.prototype.getById = function (_id) {
        return this.http.get('/players/' + _id).map(function (response) { return response.json(); });
    };
    PlayerService.prototype.update = function (player) {
        return this.http.put('/players/' + player._id, player);
    };
    PlayerService.prototype.delete = function (_id) {
        return this.http.delete('/players/' + _id);
    };
    PlayerService.prototype.getPlayerByUserId = function (_id) {
        return this.http.get('/players' + _id).map(function (response) { return response.json(); });
    };
    PlayerService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], PlayerService);
    return PlayerService;
}());
exports.PlayerService = PlayerService;
//# sourceMappingURL=player.service.js.map