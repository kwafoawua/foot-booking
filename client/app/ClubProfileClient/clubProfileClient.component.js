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
require("rxjs/add/operator/switchMap");
var index_1 = require("../_services/index");
var index_2 = require("../_services/index");
var field_1 = require("../_models/field");
var booking_1 = require("../_models/booking");
var bookingfilter_1 = require("../_models/bookingfilter");
var moment = require("moment");
var ProfileClubClientComponent = /** @class */ (function () {
    function ProfileClubClientComponent(autentication, clubService, route, router, alertService, bookingService) {
        this.autentication = autentication;
        this.clubService = clubService;
        this.route = route;
        this.router = router;
        this.alertService = alertService;
        this.bookingService = bookingService;
        this.hoursArray = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'];
        this.horasOcupadas = [];
        this.horasDisponibles = [];
        this.model = {};
        this.booking1 = new booking_1.Booking();
        this.selectedField = new field_1.Field();
        this.date = [];
        this.selectedTime = [];
        //selectedButton: any[] = [];
        this.configTime = {
            minutesInterval: 60,
            minutesFormat: '00'
        };
        this.config = {
            format: 'DD/MM/YYYY',
            enableMonthSelector: true,
            showNearMonthDays: false,
            monthFormatter: function (m) {
                return ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
                    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'][m.month()] +
                    ', ' + m.year();
            },
            appendTo: 'body'
        };
    }
    ProfileClubClientComponent.prototype.ngOnInit = function () {
        console.log(moment().format());
        this.getClub(this.route.snapshot.params['id']);
    };
    ProfileClubClientComponent.prototype.getClub = function (_id) {
        var _this = this;
        this.clubService.getResultById(_id).subscribe(function (club) {
            _this.club = club;
            _this.galery = club.galleryImg;
        });
    };
    ProfileClubClientComponent.prototype.reservar = function (field, i) {
        console.log('los datos' + this.date[i] + this.selectedTime[i]);
        // if(localStorage.currentUser){
        //     this.NotanUser =false ;
        if (field != null) {
            if (this.date[i] != '' || this.selectedTime[i] != '') {
                this.booking1.field = field;
                this.booking1.club = this.club;
                this.booking1.dateBook = this.date[i];
                this.booking1.timeBook = this.selectedTime[i];
                console.log('todos los datos');
                if (index_2.ClubService.guardarBooking(this.booking1)) {
                    this.router.navigate(['confirmation']);
                }
            }
            else {
                console.log('faltan los datos');
            }
        }
        //     else {this.NotanUser = true;}
        // }
    };
    ProfileClubClientComponent.prototype.login = function (field, index) {
        var _this = this;
        console.log('ENTRA AL MODAL DE MODAL');
        this.autentication.login(this.model.username, this.model.password)
            .subscribe(function (data) {
            _this.reservar(field, index);
        }, function (error) {
            _this.alertService.error(error);
        });
    };
    ProfileClubClientComponent.prototype.makeHoursArray = function () {
        console.log('Entra al makeHoursArray');
        this.bookingService.findAllHoursBookings().subscribe(function (hoursBooking) {
            console.log(hoursBooking);
        });
    };
    ProfileClubClientComponent.prototype.mostrameLasReservas = function () {
        //this.crearFiltros(this.idField,this.playingDate);
        console.log('1- Entró al mostrame las reservas. ');
        this.bookingService.findAllBookingsByFieldAndDay(this.bookingFilter)
            .subscribe(function (hoursBooking) {
            console.log('Ultimo- Lo que retorna la consulta: ' + hoursBooking.playingTime);
        });
    };
    ProfileClubClientComponent.prototype.crearFiltros = function (idField, playingDate) {
        console.log('1.A- Entra al crear filtros');
        return new bookingfilter_1.BookingFilter();
    };
    ProfileClubClientComponent.prototype.loadHoursValues = function (date, field) {
        var _this = this;
        console.log('la fecha: ' + date);
        console.log(field);
        var parts = date.split('/');
        var fieldDate = new Date(parts[2], parts[1] - 1, parts[0]);
        console.log('dateObject ' + fieldDate);
        this.selectedField = field;
        this.bookingFilter = new bookingfilter_1.BookingFilter(this.selectedField._id, fieldDate);
        this.bookingService.findAllBookingsByFieldAndDay(this.bookingFilter)
            .subscribe(function (hoursBooking) {
            if (hoursBooking.length >= 1) {
                hoursBooking.forEach(function (booking, index) {
                    console.log(booking);
                    console.log('Ultimo- Lo que retorna la consulta: ' + booking.playingTime);
                    _this.horasOcupadas.push(booking.playingTime);
                    _this.horasDisponibles = _this.hoursArray.filter(function (item) { return _this.horasOcupadas.indexOf(item) < 0; });
                });
            }
            else {
                _this.horasDisponibles = _this.hoursArray;
            }
        });
    };
    ProfileClubClientComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'clubProfileClient.component.html'
        }),
        __metadata("design:paramtypes", [index_1.AuthenticationService,
            index_2.ClubService,
            router_1.ActivatedRoute,
            router_1.Router,
            index_1.AlertService,
            index_2.BookingService])
    ], ProfileClubClientComponent);
    return ProfileClubClientComponent;
}());
exports.ProfileClubClientComponent = ProfileClubClientComponent;
//# sourceMappingURL=clubProfileClient.component.js.map