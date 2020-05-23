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
var booking_service_1 = require("../_services/booking.service");
var moment = require("moment");
var jsPDF = require("jspdf");
var html2canvas = require("html2canvas");
var comment_service_1 = require("../_services/comment.service");
var EstadisticasClubComponent = /** @class */ (function () {
    function EstadisticasClubComponent(bookingService, commentService) {
        this.bookingService = bookingService;
        this.commentService = commentService;
        this.single = [
            {
                'name': 'Cancha 1',
                'value': 30
            },
            {
                'name': 'Cancha 2',
                'value': 1
            },
            {
                'name': 'Cancha 3',
                'value': 20
            }
        ];
        this.single2 = [
            {
                'name': 'Enero',
                'value': 80
            },
            {
                'name': 'Febrero',
                'value': 50
            },
            {
                'name': 'Marzo',
                'value': 72
            },
            {
                'name': 'Abril',
                'value': 89
            },
            {
                'name': 'Mayo',
                'value': 100
            },
            {
                'name': 'Junio',
                'value': 72
            },
            {
                'name': 'Julio',
                'value': 89
            },
            {
                'name': 'Agosto',
                'value': 150
            },
            {
                'name': 'Septiembre',
                'value': 72
            },
            {
                'name': 'Octubre',
                'value': 89
            },
            {
                'name': 'Noviembre',
                'value': 50
            },
            {
                'name': 'Diciembre',
                'value': 72
            }
        ];
        this.multi = [
            {
                'name': 'Germany',
                'series': [
                    {
                        'name': '2010',
                        'value': 7300000
                    },
                    {
                        'name': '2011',
                        'value': 8940000
                    }
                ]
            },
            {
                'name': 'USA',
                'series': [
                    {
                        'name': '2010',
                        'value': 7870000
                    },
                    {
                        'name': '2011',
                        'value': 8270000
                    }
                ]
            },
            {
                'name': 'France',
                'series': [
                    {
                        'name': '2010',
                        'value': 5000002
                    },
                    {
                        'name': '2011',
                        'value': 5800000
                    }
                ]
            }
        ];
        // view: any[] = [600, 500];
        //view1: any[] = [1200, 400];
        //  view2: any[] = [600, 500];
        // options
        this.options = {
            showLabels: true,
            explodeSlices: false,
            doughnut: false,
            showXAxis: true,
            showYAxis: true,
            gradient: false,
            showLegend: true,
            showXAxisLabel: true,
            showYAxisLabel: true,
            animations: true,
            colorScheme: {
                domain: ['#0B6121', '#04B431', '#01DF3A', '#7ed957']
            },
            colorScheme1: {
                domain: ['#009900', '#e3bc08', '#C11B17', '#2B65EC', '#F87217', '#806517', '#7D0552', '#413839']
            }
        };
        this.autoScale = true;
        this._id = JSON.parse(localStorage.getItem('currentUser')).playerOrClubId;
        this.statusChart = [];
        this.bookingMonthChart = [
            {
                'name': 'Enero',
                'value': 0
            },
            {
                'name': 'Febrero',
                'value': 0
            },
            {
                'name': 'Marzo',
                'value': 0
            },
            {
                'name': 'Abril',
                'value': 0
            },
            {
                'name': 'Mayo',
                'value': 0
            },
            {
                'name': 'Junio',
                'value': 0
            },
            {
                'name': 'Julio',
                'value': 0
            },
            {
                'name': 'Agosto',
                'value': 0
            },
            {
                'name': 'Septiembre',
                'value': 0
            },
            {
                'name': 'Octubre',
                'value': 0
            },
            {
                'name': 'Noviembre',
                'value': 0
            },
            {
                'name': 'Diciembre',
                'value': 0
            }
        ];
        this.fieldChart = [];
    }
    EstadisticasClubComponent.prototype.ngOnInit = function () {
        this.getBookings(this._id);
        this.countComments(this._id);
    };
    EstadisticasClubComponent.prototype.updateData = function () {
        this.statusChart = this.statusChart.slice();
        this.fieldChart = this.fieldChart.slice();
        this.bookingMonthChart = this.bookingMonthChart.slice();
    };
    EstadisticasClubComponent.prototype.countComments = function (_id) {
        var _this = this;
        this.commentService.findAllCommentForAClub(_id).subscribe(function (comments) {
            _this.cantComments = comments.length;
        });
    };
    EstadisticasClubComponent.prototype.getBookings = function (_id) {
        var _this = this;
        var finalizado = false;
        this.bookingService.findAllByReferenceId(_id).subscribe(function (bookings) {
            console.log(bookings);
            bookings.forEach(function (booking) {
                //statusChart asistido, cancelado, reservado
                if (['Asistido', 'Cancelado', 'Pago Total'].indexOf(booking.status) > -1) {
                    var statusC = _this.statusChart;
                    var statusChartIndex = statusC.findIndex(function (status) { return status.name === booking.status; });
                    if (statusChartIndex > -1) {
                        statusC[statusChartIndex].value = statusC[statusChartIndex].value + 1;
                        _this.statusChart = statusC;
                    }
                    else {
                        var newStatus = {
                            name: booking.status,
                            value: 1
                        };
                        statusC.push(newStatus);
                        _this.statusChart = statusC;
                    }
                }
                //fieldChart
                var fieldChartIndex = _this.fieldChart.findIndex(function (field) { return field.name === booking.field.fieldName; });
                if (fieldChartIndex > -1) {
                    _this.fieldChart[fieldChartIndex].value = _this.fieldChart[fieldChartIndex].value + 1;
                }
                else {
                    var newField = {
                        name: booking.field.fieldName,
                        value: 1
                    };
                    _this.fieldChart.push(newField);
                }
                //hacer un filtro de que si es asistido cuente la fecha.
                var dateb = moment(booking.playingDate, 'YYYY-MM-DD').toDate();
                var month = dateb.getMonth();
                _this.bookingMonthChart[month].value = _this.bookingMonthChart[month].value + 1;
                //bookingMonthChart
                console.log(dateb.getMonth());
                console.log(dateb);
                console.log(_this.fieldChart);
                console.log(_this.statusChart);
                console.log(_this.bookingMonthChart);
                finalizado = true;
            });
            _this.loaded = finalizado;
        });
    };
    EstadisticasClubComponent.onSelect = function (event) {
        console.log(event);
    };
    EstadisticasClubComponent.prototype.download = function () {
        var svg = document.getElementById('chart-bar-vertical').getElementsByTagName('svg')[0];
        html2canvas(svg).then(function (canvas) {
            console.log(canvas);
            var img = canvas.toDataURL('image/png');
            var doc = new jsPDF('l', 'mm', 'a4');
            var width = doc.internal.pageSize.width;
            var height = doc.internal.pageSize.height;
            doc.text('Reservas realizadas en el año', 20, 50);
            doc.addImage(img, 'PNG', 20, 50, 160, 80);
            doc.save('reservas-realizadas-en-el-anio.pdf');
        });
    };
    EstadisticasClubComponent.prototype.download1 = function () {
        var svg = document.getElementById('chart-advanced-pie').getElementsByTagName('svg')[0];
        html2canvas(svg).then(function (canvas) {
            console.log(canvas);
            var img = canvas.toDataURL('image/png');
            var doc = new jsPDF();
            doc.text(50, 20, 'Reservas realizadas por Estado');
            // doc.addHTML(document.getElementByClassName('advanced-pie-legend-wrapper'));
            doc.addImage(img, 'JPEG', 20, 50);
            doc.save('reservas-realizadas-por-estado.pdf');
        });
    };
    EstadisticasClubComponent.prototype.download2 = function () {
        var svg = document.getElementById('chart-pie-chart-canchas').getElementsByTagName('svg')[0];
        html2canvas(svg).then(function (canvas) {
            console.log(canvas);
            var img = canvas.toDataURL('image/png');
            var doc = new jsPDF();
            doc.text(50, 20, 'Reservas realizadas por Cancha');
            doc.addImage(img, 'JPEG', 20, 50);
            doc.save('reservas-realizadas-por-cancha.pdf');
        });
    };
    __decorate([
        core_1.ViewChild('tooltipTemplate'),
        __metadata("design:type", core_1.TemplateRef)
    ], EstadisticasClubComponent.prototype, "tooltilTemplate", void 0);
    EstadisticasClubComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'estadisticas-club.component.html'
        }),
        __metadata("design:paramtypes", [booking_service_1.BookingService, comment_service_1.CommentService])
    ], EstadisticasClubComponent);
    return EstadisticasClubComponent;
}());
exports.EstadisticasClubComponent = EstadisticasClubComponent;
//# sourceMappingURL=estadisticas-club.component.js.map