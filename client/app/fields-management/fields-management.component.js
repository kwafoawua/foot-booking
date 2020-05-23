"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var date_fns_1 = require("date-fns");
var Subject_1 = require("rxjs/Subject");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var angular_calendar_1 = require("angular-calendar");
var booking_service_1 = require("../_services/booking.service");
var custom_date_formatter_provider_1 = require("./custom-date-formatter.provider");
var club_service_1 = require("../_services/club.service");
var alert_service_1 = require("../_services/alert.service");
var bookingfilter_1 = require("../_models/bookingfilter");
var field_1 = require("../_models/field");
var forms_1 = require("@angular/forms");
var I18N_VALUES = {
    'es': {
        weekdays: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
        months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    }
    // other languages you would support
};
// Define a service holding the language. You probably already have one if your app is i18ned. Or you could also
// use the Angular LOCALE_ID value
var I18n = /** @class */ (function () {
    function I18n() {
        this.language = 'es';
    }
    I18n = __decorate([
        core_1.Injectable()
    ], I18n);
    return I18n;
}());
exports.I18n = I18n;
// Define custom service providing the months and weekdays translations
var CustomDatepickerI18n = /** @class */ (function (_super) {
    __extends(CustomDatepickerI18n, _super);
    function CustomDatepickerI18n(_i18n) {
        var _this = _super.call(this) || this;
        _this._i18n = _i18n;
        return _this;
    }
    CustomDatepickerI18n.prototype.getWeekdayShortName = function (weekday) {
        return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
    };
    CustomDatepickerI18n.prototype.getMonthShortName = function (month) {
        return I18N_VALUES[this._i18n.language].months[month - 1];
    };
    CustomDatepickerI18n.prototype.getMonthFullName = function (month) {
        return this.getMonthShortName(month);
    };
    CustomDatepickerI18n = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [I18n])
    ], CustomDatepickerI18n);
    return CustomDatepickerI18n;
}(ng_bootstrap_1.NgbDatepickerI18n));
exports.CustomDatepickerI18n = CustomDatepickerI18n;
var colors = {
    red: {
        primary: '#C11B17',
        secondary: '#FAE3E3'
    },
    blue: {
        primary: '#2B65EC',
        secondary: '#D1E8FF'
    },
    yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA'
    },
    green: {
        primary: '#009900',
        secondary: '#ccffcc'
    },
    lightgreen: {
        primary: '#F87217',
        secondary: '#fffbe2'
    }
};
var FieldsManagementComponent = /** @class */ (function () {
    function FieldsManagementComponent(modal, bookingService, clubService, alertService, fb) {
        var _this = this;
        this.modal = modal;
        this.bookingService = bookingService;
        this.clubService = clubService;
        this.alertService = alertService;
        this.fb = fb;
        this.view = 'month';
        this.locale = 'es';
        this.viewDate = new Date();
        this.events = [];
        this.bookings = [];
        this.club = {};
        this._id = JSON.parse(localStorage.getItem('currentUser')).playerOrClubId;
        //horas
        this.hoursArray = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'];
        this.horasOcupadas = [];
        this.horasDisponibles = [];
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
        this.selectedField = new field_1.Field();
        this.actions = [
            {
                label: '<i class="fa fa-fw fa-pencil"></i>',
                onClick: function (_a) {
                    var event = _a.event;
                    _this.handleEvent('Edited', event);
                }
            },
            {
                label: '<i class="fa fa-fw fa-times"></i>',
                onClick: function (_a) {
                    var event = _a.event;
                    _this.events = _this.events.filter(function (iEvent) { return iEvent !== event; });
                    _this.handleEvent('Deleted', event);
                }
            }
        ];
        this.refresh = new Subject_1.Subject();
        this.activeDayIsOpen = false;
    }
    FieldsManagementComponent.prototype.ngOnInit = function () {
        this.getBookings(this._id);
        //this.getBookingsByStatus(this._id, "Cancelado");
        this.getClub(this._id);
        this.createForm();
    };
    FieldsManagementComponent.prototype.getClub = function (_id) {
        var _this = this;
        this.clubService.getById(_id).subscribe(function (club) {
            _this.club = club;
            _this.nuevaReservaForm.get('clubAddress').setValue(_this.club.address.address);
            _this.nuevaReservaForm.get('clubName').setValue(_this.club.name);
            _this.nuevaReservaForm.get('clubId').setValue(_this.club._id);
            _this.nuevaReservaForm.get('clubPhoneNumber').setValue(_this.club.phoneNumber);
        });
    };
    FieldsManagementComponent.prototype.createForm = function () {
        this.nuevaReservaForm = this.fb.group({
            playerName: [null, forms_1.Validators.required],
            playerLastName: [null, forms_1.Validators.required],
            playerPhoneNumber: [null, forms_1.Validators.required],
            clubId: [null, forms_1.Validators.required],
            clubName: [null, forms_1.Validators.required],
            clubAddress: [null, forms_1.Validators.required],
            clubPhoneNumber: [null, forms_1.Validators.required],
            fieldId: [null, forms_1.Validators.required],
            fieldName: [null, forms_1.Validators.required],
            fieldCantPlayers: [null, forms_1.Validators.required],
            fieldPrice: [null, forms_1.Validators.required],
            playingDate: [null, forms_1.Validators.required],
            playingTime: [null, forms_1.Validators.required],
            fee: null,
            status: null
        });
    };
    // private getBookingsByStatus(_id: string, bookingStatus: string){
    //     this.bookingService.findAllByReferenceId(_id).subscribe((bookings)=>{
    //         this.bookings = bookings;
    //         const eventArray :CalendarEvent[] = [];
    //         this.bookings.forEach((booking) => {
    //             if (booking.status == bookingStatus) {
    //
    //                 let colorStatus: any;
    //                 switch (booking.status){
    //
    //                     case 'Reservado':
    //                         colorStatus= colors.blue;
    //                         break;
    //                     case 'Cancelado':
    //                         colorStatus = colors.red;
    //                         break;
    //                     case 'Asistido':
    //                         colorStatus = colors.green;
    //                         break;
    //                     case 'Pendiente de Pago':
    //                         colorStatus = colors.yellow;
    //                         break;
    //                     default:
    //                         colorStatus = colors.yellow;
    //                         break;
    //                 }
    //                 //console.log(colorStatus);
    //                 let event = {
    //                     start: startOfDay(booking.playingDate),
    //                     end: startOfDay(booking.playingDate),
    //                     title: booking.field.fieldName + ' Horario: '+booking.playingTime+' Cliente: '+booking.player.name+' '+booking.player.lastName,
    //                     color: colorStatus,
    //                     actions: this.actions,
    //                     booking: booking
    //
    //                 };
    //                 eventArray.push(event);
    //
    //             }
    //         });
    //             this.events = eventArray;
    //             if(this.events) {
    //                 this.refresh.next();
    //             }
    //         console.log(this.events);
    //     });
    // }
    FieldsManagementComponent.prototype.getBookings = function (_id) {
        var _this = this;
        this.bookingService.findAllByReferenceId(_id).subscribe(function (bookings) {
            _this.bookings = bookings;
            var eventArray = [];
            _this.bookings.forEach(function (booking) {
                var colorStatus;
                switch (booking.status) {
                    case 'Pago Parcial':
                        colorStatus = colors.blue;
                        break;
                    case 'Cancelado':
                        colorStatus = colors.red;
                        break;
                    case 'Asistido':
                        colorStatus = colors.green;
                        break;
                    case 'Pendiente de Pago':
                        colorStatus = colors.yellow;
                        break;
                    case 'Pago Total':
                        colorStatus = colors.lightgreen;
                        break;
                    default:
                        colorStatus = colors.yellow;
                        break;
                }
                //console.log(colorStatus);
                var event = {
                    start: date_fns_1.startOfDay(booking.playingDate),
                    end: date_fns_1.startOfDay(booking.playingDate),
                    title: booking.field.fieldName + ' Horario: ' + booking.playingTime + ' Cliente: ' + booking.player.name + ' ' + booking.player.lastName,
                    color: colorStatus,
                    actions: _this.actions,
                    booking: booking,
                };
                eventArray.push(event);
            });
            _this.events = eventArray;
            if (_this.events) {
                _this.refresh.next();
            }
            console.log(_this.events);
        });
    };
    FieldsManagementComponent.prototype.onStatusChange = function (newStatus) {
        console.log(newStatus);
        this.selectedStatus = newStatus;
    };
    // open(content) {
    //     this.modal.open(content)
    // }
    FieldsManagementComponent.prototype.dayClicked = function (_a) {
        var date = _a.date, events = _a.events;
        if (date_fns_1.isSameMonth(date, this.viewDate)) {
            if ((date_fns_1.isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0) {
                this.activeDayIsOpen = false;
            }
            else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
    };
    FieldsManagementComponent.prototype.eventTimesChanged = function (_a) {
        var event = _a.event, newStart = _a.newStart, newEnd = _a.newEnd;
        event.start = newStart;
        event.end = newEnd;
        this.handleEvent('Dropped or resized', event);
        this.refresh.next();
    };
    FieldsManagementComponent.prototype.handleEvent = function (action, event) {
        var _this = this;
        this.modalData = { event: event, action: action };
        console.log(event);
        this.montoPagado = event.booking.payment.fee;
        this.modal.open(this.modalContent, { size: 'lg' }).result.then(function (result) {
            console.log(_this.selectedStatus);
            console.log(result);
            if (_this.selectedStatus || _this.montoPagado) {
                _this.closeResult = result;
                var newStatus = {};
                newStatus.bookingId = result._id;
                if (_this.selectedStatus) {
                    newStatus.status = _this.selectedStatus;
                }
                if (_this.montoPagado) {
                    newStatus.fee = _this.montoPagado;
                }
                _this.bookingService.updateBookingStatus(newStatus).subscribe(function (data) {
                    _this.selectedStatus = undefined;
                    _this.montoPagado = undefined;
                    _this.alertService.success('Se actualizó correctamente el estado de la reserva', false);
                    _this.getBookings(_this._id);
                    //this.getBookingsByStatus(this._id, "Cancelado");
                    console.log(_this.selectedStatus);
                }, function (error) {
                    _this.alertService.error('el error q viene de backend ' + error);
                });
            }
        });
    };
    FieldsManagementComponent.prototype.addEvent = function () {
        var _this = this;
        var registrado;
        if (this.nuevaReservaForm.valid) {
            this.clubService.guardarReserva(this.nuevaReservaForm.value)
                .subscribe(function (booking) {
                _this.nuevaReservaForm.get('fieldId').setValue(null);
                _this.nuevaReservaForm.get('fieldName').setValue(null);
                _this.nuevaReservaForm.get('fieldCantPlayers').setValue(null);
                _this.nuevaReservaForm.get('fieldPrice').setValue(null);
                _this.nuevaReservaForm.get('playingDate').setValue(null);
                _this.nuevaReservaForm.get('fee').setValue(null);
                _this.nuevaReservaForm.get('status').setValue(null);
                _this.nuevaReservaForm.get('playingTime').setValue(null);
                _this.nuevaReservaForm.get('playerName').setValue(null);
                _this.nuevaReservaForm.get('playerLastName').setValue(null);
                _this.nuevaReservaForm.get('playerPhoneNumber').setValue(null);
                _this.getBookings(_this._id);
            }, function (error) {
                _this.alertService.error(error);
            });
        }
    };
    //     filterbyStatusChange(status: string):void {
    //         console.log("Entra al status change con status " + status);
    //         if (status == "Todas" || status == "") {
    //             this.getBookings(this._id);
    //         } else {
    //             this.getBookingsByStatus(this._id, status);
    //         }
    //     }
    //
    //     filterByFieldName(fieldName: string):void {
    //         console.log("Entra al status change con fieldName " + fieldName);
    //         if (fieldName == "Todas" || fieldName == "") {
    //             this.getBookings(this._id);
    //         }
    //     }
    FieldsManagementComponent.prototype.loadHoursValues = function (date) {
        var _this = this;
        console.log('la fecha: ' + date);
        var parts = date.split('/');
        var fieldDate = new Date(parts[2], parts[1] - 1, parts[0]);
        console.log('dateObject ' + fieldDate);
        this.nuevaReservaForm.get('playingDate').setValue(fieldDate.toISOString());
        this.bookingFilter = new bookingfilter_1.BookingFilter(this.nuevaReservaForm.controls['fieldId'].value, fieldDate);
        console.log('El selectedDate: ' + this.bookingFilter);
        this.bookingService.findAllBookingsByFieldAndDay(this.bookingFilter)
            .subscribe(function (hoursBooking) {
            if (hoursBooking.length >= 1) {
                hoursBooking.forEach(function (booking, index) {
                    console.log(booking);
                    console.log('Ultimo- Lo que retorna la consulta: ' + booking.playingTime);
                    _this.horasOcupadas.push(booking.playingTime);
                    _this.horasDisponibles = _this.hoursArray.filter(function (item) { return _this.horasOcupadas.indexOf(item) < 0; });
                    console.log('Array nuevo: ' + _this.horasDisponibles);
                });
            }
            else {
                _this.horasDisponibles = _this.hoursArray;
                console.log('No hay reservas en este día');
            }
        });
    };
    FieldsManagementComponent.prototype.setFieldValues = function (field) {
        //this.fieldIndex = i;
        console.log(field);
        this.nuevaReservaForm.get('fieldId').setValue(field._id);
        this.nuevaReservaForm.get('fieldName').setValue(field.fieldName);
        this.nuevaReservaForm.get('fieldCantPlayers').setValue(field.cantPlayers);
        this.nuevaReservaForm.get('fieldPrice').setValue(field.price);
    };
    __decorate([
        core_1.ViewChild('modalContent'),
        __metadata("design:type", core_1.TemplateRef)
    ], FieldsManagementComponent.prototype, "modalContent", void 0);
    FieldsManagementComponent = __decorate([
        core_1.Component({
            selector: 'mwl-demo-component',
            moduleId: module.id,
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            //styleUrls: ['styles.css'],
            templateUrl: 'fields-management.component.html',
            providers: [
                {
                    provide: angular_calendar_1.CalendarDateFormatter,
                    useClass: custom_date_formatter_provider_1.CustomDateFormatter
                },
                I18n,
                {
                    provide: ng_bootstrap_1.NgbDatepickerI18n,
                    useClass: CustomDatepickerI18n
                }
            ]
        }),
        __metadata("design:paramtypes", [ng_bootstrap_1.NgbModal,
            booking_service_1.BookingService,
            club_service_1.ClubService, alert_service_1.AlertService,
            forms_1.FormBuilder])
    ], FieldsManagementComponent);
    return FieldsManagementComponent;
}());
exports.FieldsManagementComponent = FieldsManagementComponent;
//# sourceMappingURL=fields-management.component.js.map