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
var BookingService = /** @class */ (function () {
    function BookingService(http) {
        this.http = http;
    }
    BookingService.prototype.create = function (booking) {
        console.log('El Booking ');
        return this.http.post('/bookings/register', booking);
    };
    BookingService.prototype.getAll = function () {
        return this.http.get('/booking').map(function (response) { return response.json(); });
    };
    BookingService.prototype.findAllByReferenceId = function (_id) {
        console.log(_id);
        return this.http.get('/bookings/' + _id).map(function (response) { return response.json(); });
    };
    BookingService.prototype.update = function (booking, _id) {
        return this.http.put('/booking/' + _id, booking);
    };
    BookingService.prototype.delete = function (_id) {
        return this.http.delete('/booking/' + _id);
    };
    BookingService.prototype.findAllHoursBookings = function () {
        console.log('En el servicio de findAllHoursBookings, datos de entrada:');
        return this.http.get('/bookings/getHoursToPlay')
            .map(function (response) { return response.json(); });
    };
    BookingService.prototype.findAllBookingsByFieldAndDay = function (filter) {
        console.log('2- Entro al servicio con filter: ');
        return this.http.get('/bookings/horarios/' + JSON.stringify(filter))
            .map(function (horarios) { return horarios.json(); });
    };
    BookingService.prototype.updateBookingStatus = function (newStatus) {
        return this.http.put('/bookings/setStatus/', newStatus).map(function (response) { return response.json(); });
    };
    BookingService.bookings = [];
    BookingService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], BookingService);
    return BookingService;
}());
exports.BookingService = BookingService;
//# sourceMappingURL=booking.service.js.map