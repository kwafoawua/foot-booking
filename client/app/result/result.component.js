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
var router_2 = require("@angular/router");
// Observable class extensions
require("rxjs/add/observable/of");
// Observable operators
require("rxjs/add/operator/catch");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
var clubfilter_1 = require("../_models/clubfilter");
var ResultComponent = /** @class */ (function () {
    function ResultComponent(activatedRoute, searchService, router) {
        this.activatedRoute = activatedRoute;
        this.searchService = searchService;
        this.router = router;
        this.cantPlayerSelect = [{ cant: 5, desc: '5 Jugadores' }, { cant: 7, desc: '7 Jugadores' }, {
                cant: 11,
                desc: '11 Jugadores'
            }];
        this.servicesChecked = [];
        this.clubname = '';
        // this.form = new FormGroup({'clubname': new FormControl('clubname')});
    }
    ResultComponent.prototype.ngOnInit = function () {
        this.setCurrentPosition();
        this.clubs = index_1.SearchService.clubs;
        this.services = this.searchService.getClubServices();
    };
    //LE PASO LOS DATOS PARA CREAR LOS FILTROS
    ResultComponent.prototype.crearFiltros = function () {
        // let modelform = this.form.value;
        return new clubfilter_1.ClubFilter(this.clubname, this.servicesChecked, this.cantPlayers, this.maxPrice, this.minPrice);
    };
    //BUSCO POR NOMBRE
    ResultComponent.prototype.buscarClubsPorNombre = function () {
        var _this = this;
        this.clubfilter = this.crearFiltros();
        console.log('ya cree el filtro', this.clubfilter);
        this.searchService.findClubsByFilters(this.clubfilter).subscribe(function () {
            _this.clubs = index_1.SearchService.clubs;
        });
        console.log(this.clubfilter);
    };
    //BUSCO POR LOS FILTROS
    ResultComponent.prototype.buscarClubsPorFiltros = function () {
        var _this = this;
        this.clubfilter = this.crearFiltros();
        console.log('ya cree el filtro', this.clubfilter);
        this.searchService.findClubsByMultipleFilter(this.clubfilter).subscribe(function () {
            _this.clubs = index_1.SearchService.clubs;
        });
        console.log(this.clubfilter);
    };
    ResultComponent.prototype.addService = function (e) {
        if (e.state) {
            console.log('agrego el servicio ', e.name);
            this.servicesChecked.push({ 'id': e.id, 'name': e.name });
            // console.log("array", this.servicesChecked)
        }
        else {
            console.log('saco el servicio', e.name);
            for (var i = 0; i < this.servicesChecked.length; i++)
                if (this.servicesChecked[i].name === e.name) {
                    this.servicesChecked.splice(i, 1);
                    break;
                }
        }
    };
    ResultComponent.prototype.setCurrentPosition = function () {
        var _this = this;
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                _this.lat = position.coords.latitude;
                _this.lng = position.coords.longitude;
                _this.zoom = 16;
            });
        }
    };
    ResultComponent = __decorate([
        core_1.Component({
            selector: 'results',
            templateUrl: 'app/result/result.component.html',
            providers: [index_1.SearchService],
        }),
        __metadata("design:paramtypes", [router_2.ActivatedRoute,
            index_1.SearchService,
            router_1.Router])
    ], ResultComponent);
    return ResultComponent;
}());
exports.ResultComponent = ResultComponent;
//# sourceMappingURL=result.component.js.map