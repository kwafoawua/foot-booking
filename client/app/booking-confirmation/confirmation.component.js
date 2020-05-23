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
var index_2 = require("../_services/index");
var index_3 = require("../_services/index");
var confirmationComponent = /** @class */ (function () {
    //subscription: Subscription;
    function confirmationComponent(playerService, userService, route, clubService, alertService, router) {
        this.playerService = playerService;
        this.userService = userService;
        this.route = route;
        this.clubService = clubService;
        this.alertService = alertService;
        this.router = router;
        this.reservaFinal = {};
        this.loading = true;
        this.confirmado = false;
    }
    confirmationComponent.prototype.ngOnInit = function () {
        this.booking = index_2.ClubService.obtenerBooking();
        if (this.booking) {
            var parts = this.booking.dateBook.split('/');
            var mydate = new Date(parts[2], parts[1] - 1, parts[0]);
            console.log('dateObject ' + mydate);
            this.reservaFinal.clubId = this.booking.club._id;
            this.reservaFinal.clubName = this.booking.club.name;
            this.reservaFinal.clubAddress = this.booking.club.address.address;
            this.reservaFinal.clubPhoneNumber = this.booking.club.phoneNumber;
            this.reservaFinal.fieldId = this.booking.field._id;
            this.reservaFinal.fieldName = this.booking.field.fieldName;
            this.reservaFinal.fieldCantPlayers = this.booking.field.cantPlayers;
            this.reservaFinal.fieldFieldType = this.booking.field.fieldType;
            this.reservaFinal.fieldPrice = this.booking.field.price;
            this.reservaFinal.playingDate = mydate;
            this.reservaFinal.playingTime = this.booking.timeBook;
            //this.reservaFinal.paidMethod="EN SITIO";
        }
        console.log(this.booking);
        console.log('el confirmado', this.confirmado);
        console.log('Reserva Final ' + this.reservaFinal);
        var _id = JSON.parse(localStorage.getItem('currentUser')).playerOrClubId;
        this.getPlayer(_id);
        console.log('kakak', +this.player);
    };
    confirmationComponent.prototype.getPlayer = function (_id) {
        var _this = this;
        console.log('ESTOOO', _id);
        console.log(this.player);
        // this.player=getUserAuthenticated();
        this.playerService.getById(_id).subscribe(function (player) {
            _this.player = player;
            _this.reservaFinal.playerName = player.name;
            _this.reservaFinal.playerLastName = player.lastName;
            _this.reservaFinal.playerPhoneNumber = player.phoneNumber;
            _this.reservaFinal.playerId = player._id;
            console.log(_this.reservaFinal);
        });
    };
    confirmationComponent.prototype.confirm = function () {
        var _this = this;
        console.log('Reserva Final ' + JSON.stringify(this.reservaFinal));
        this.clubService.guardarReserva(this.reservaFinal)
            .subscribe(function (data) {
            _this.confirmado = true;
            _this.alertService.success('Su reserva se ha registrado con exito', true);
            _this.router.navigate(['/player/mis-reservas']);
        }, function (error) {
            _this.alertService.error(error);
            _this.loading = false;
        });
    };
    confirmationComponent.prototype.goToMisReservas = function () {
        this.router.navigate(['/player/mis-reservas']);
    };
    confirmationComponent.prototype.goToBusqueda = function () {
        this.router.navigate(['results']);
    };
    confirmationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'confirmation.html',
            providers: [index_2.ClubService]
        }),
        __metadata("design:paramtypes", [index_3.PlayerService,
            index_1.UserService,
            router_1.ActivatedRoute,
            index_2.ClubService,
            index_3.AlertService,
            router_1.Router])
    ], confirmationComponent);
    return confirmationComponent;
}());
exports.confirmationComponent = confirmationComponent;
//# sourceMappingURL=confirmation.component.js.map