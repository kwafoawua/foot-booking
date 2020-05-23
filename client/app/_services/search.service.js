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
var SearchService = /** @class */ (function () {
    function SearchService(http) {
        this.http = http;
        this.service = [
            { id: 1, name: 'Asador' },
            { id: 2, name: 'Buffet' },
            { id: 3, name: 'Parking' },
            { id: 4, name: 'Techado' },
            { id: 5, name: 'Bar' },
            { id: 6, name: 'Nocturno' }
        ];
    }
    SearchService_1 = SearchService;
    SearchService.prototype.findClubsByFilters = function (filter) {
        console.log('en esl servico', filter);
        return this.http.get('/findClub/' + JSON.stringify(filter))
            .map(function (response) {
            SearchService_1.clubs = response.json();
            // return  response.json()
        });
    };
    SearchService.prototype.getAll = function () {
        return this.http.get('/clubs/').map(function (response) { return response.json(); });
    };
    SearchService.prototype.getClubServices = function () {
        return this.service;
    };
    SearchService.prototype.findClubsByMultipleFilter = function (filter) {
        console.log('en esl servico', filter);
        return this.http.get('/findClubsByFilters/' + JSON.stringify(filter))
            .map(function (response) {
            console.log(response);
            SearchService_1.clubs = response.json();
            // return  response.json()
        });
    };
    SearchService.clubs = [];
    SearchService = SearchService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], SearchService);
    return SearchService;
    var SearchService_1;
}());
exports.SearchService = SearchService;
//# sourceMappingURL=search.service.js.map