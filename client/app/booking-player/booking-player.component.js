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
var club_service_1 = require("../_services/club.service");
var booking_service_1 = require("../_services/booking.service");
var player_service_1 = require("../_services/player.service");
var bookingPlayerComponent = /** @class */ (function () {
    function bookingPlayerComponent(route, playerService, clubService, bookingService) {
        this.route = route;
        this.playerService = playerService;
        this.clubService = clubService;
        this.bookingService = bookingService;
        this.bookings = [];
    }
    bookingPlayerComponent.prototype.ngOnInit = function () {
        var _id = JSON.parse(localStorage.getItem('currentUser')).playerOrClubId;
        this.getBookings(_id);
    };
    bookingPlayerComponent.prototype.getBookings = function (_id) {
        var _this = this;
        this.bookingService.findAllByReferenceId(_id).subscribe(function (bookings) {
            _this.bookings = bookings;
            console.log('esto', _this.bookings);
        });
    };
    bookingPlayerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'booking-player.html'
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            player_service_1.PlayerService,
            club_service_1.ClubService,
            booking_service_1.BookingService])
    ], bookingPlayerComponent);
    return bookingPlayerComponent;
}());
exports.bookingPlayerComponent = bookingPlayerComponent;
//# sourceMappingURL=booking-player.component.js.map