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
var ClubService = /** @class */ (function () {
    function ClubService(http) {
        this.http = http;
        /* this.dataStore = { clubs: [] };
         this._clubs = <BehaviorSubject<Club[]>>new BehaviorSubject([]);
         this.clubs = this._clubs.asObservable();*/
    }
    ClubService_1 = ClubService;
    ClubService.prototype.create = function (club) {
        return this.http.post('/clubs/register', club);
    };
    ClubService.prototype.getAll = function () {
        /* return this.http.get('/clubs').map((response: Response) => response.json()).subscribe(data => {
             this.dataStore.clubs = data;
             this._clubs.next(Object.assign({}, this.dataStore).clubs);
         } , error => console.log('No se pueden cargar los Clubes'));*/
        return this.http.get('/clubs').map(function (response) { return response.json(); });
    };
    ClubService.prototype.getById = function (_id) {
        return this.http.get('/clubs/' + _id).map(function (response) { return response.json(); });
        /* return this.http.get('/clubs/' + _id).map((response: Response) => response.json()).subscribe(data =>{
              let notFound = true;
              this.dataStore.clubs.forEach((club, index) => {
                  if(club._id === data._id) {
                      this.dataStore.clubs[index] = data;
                      notFound = false;
                  }
                  });
              if(notFound) {
                  this.dataStore.clubs.push(data);
              }
              this._clubs.next(Object.assign({}, this.dataStore).clubs);
              }, error => console.log('No se pudo cargar el club'));*/
    };
    ClubService.prototype.getResultById = function (_id) {
        return this.http.get('/clubs/results/' + _id).map(function (response) { return response.json(); });
    };
    ClubService.prototype.update = function (_id, formData) {
        return this.http.put('/clubs/' + _id, formData);
    };
    ClubService.prototype.updateFields = function (_id, fields) {
        return this.http.put('/clubs/fields/' + _id, fields);
    };
    ClubService.prototype.delete = function (_id) {
        return this.http.delete('/clubs/' + _id);
    };
    ClubService.prototype.upload = function (image) {
        return this.http.post('/uploads/', image);
    };
    //SET
    ClubService.guardarBooking = function (book) {
        ClubService_1.booking = book;
        console.log(this.booking);
        return true;
    };
    //GET
    ClubService.obtenerBooking = function () {
        return ClubService_1.booking;
    };
    ClubService.prototype.guardarReserva = function (reservaFinal) {
        return this.http.post('/bookings/register', reservaFinal);
    };
    ClubService = ClubService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], ClubService);
    return ClubService;
    var ClubService_1;
}());
exports.ClubService = ClubService;
//# sourceMappingURL=club.service.js.map