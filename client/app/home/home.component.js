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
var forms_1 = require("@angular/forms");
var index_1 = require("../_services/index");
var router_1 = require("@angular/router");
var clubfilter_1 = require("../_models/clubfilter");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(searchService, router, formBuilder) {
        this.searchService = searchService;
        this.router = router;
        this.formBuilder = formBuilder;
        this.zoom = 16.88;
        this.clubname = '';
        this.configTime = {
            minutesInterval: 60,
            minutesFormat: '00'
        };
        this.config = {
            format: 'DD/MM/YYYY',
            enableMonthSelector: true,
            showNearMonthDays: false,
            monthFormatter: function (m) {
                return ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
                    'jul', 'ago', 'sep', 'oct', 'nov', 'dic'][m.month()] +
                    ', ' + m.year();
            },
            appendTo: 'body'
        };
        this.homeForm = this.formBuilder.group({
            clubName: '',
            date: '',
        });
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.setCurrentPosition();
    };
    HomeComponent.prototype.buscarClub = function () {
        this.buscarClubsPorFiltros();
    };
    //BUSCO POR LOS FILTROS
    HomeComponent.prototype.buscarClubsPorFiltros = function () {
        var _this = this;
        this.clubfilter = this.crearFiltros();
        this.searchService.findClubsByFilters(this.clubfilter)
            .subscribe(function (a) {
            console.log('resultado', a);
            _this.router.navigate(['results']);
        });
    };
    //LE PASO LOS DATOS PARA CREAR LOS FILTROS
    HomeComponent.prototype.crearFiltros = function () {
        return new clubfilter_1.ClubFilter(this.homeForm.get('clubName').value);
    };
    HomeComponent.prototype.setCurrentPosition = function () {
        var _this = this;
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                _this.lat = position.coords.latitude;
                _this.lng = position.coords.longitude;
                _this.zoom = 16;
            });
        }
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'home.component.html',
        }),
        __metadata("design:paramtypes", [index_1.SearchService,
            router_1.Router,
            forms_1.FormBuilder])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map