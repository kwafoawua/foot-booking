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
var tournament_service_1 = require("../../_services/tournament.service");
var alert_service_1 = require("../../_services/alert.service");
var TournamentDefinitionComponent = /** @class */ (function () {
    function TournamentDefinitionComponent(fb, tournamentService, alertService) {
        this.fb = fb;
        this.tournamentService = tournamentService;
        this.alertService = alertService;
        this.idClub = JSON.parse(localStorage.getItem('currentUser')).playerOrClubId;
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
        this.createForm();
    }
    TournamentDefinitionComponent.prototype.ngOnInit = function () {
    };
    TournamentDefinitionComponent.prototype.createForm = function () {
        this.tournamentForm = this.fb.group({
            _idClubId: [null],
            name: [null, forms_1.Validators.required],
            description: [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(255)])],
            inicioInscripcion: [null, forms_1.Validators.required],
            finInscripcion: [null, forms_1.Validators.required],
            inicioCampeonato: [null, forms_1.Validators.required],
            finCampeonato: [null],
            cantEquipos: [null, forms_1.Validators.required],
            fee: [null, forms_1.Validators.required],
            tipo: [null, forms_1.Validators.required],
            categoria: [null, forms_1.Validators.required]
        });
    };
    TournamentDefinitionComponent.prototype.createTournament = function () {
        var _this = this;
        if (this.tournamentForm.valid) {
            // this.tournament = new Tournament();
            // this.tournament._idClub = this.idClub;
            // this.tournament.name = this.tournamentForm.name;
            // this.tournament.description = this.tournamentForm.description;
            // this.tournament.startInscription = this.tournamentForm.inicioInscripcion;
            // this.tournament.finishInscription = this.tournamentForm.finInscripcion;
            // this.tournament.statingDay = this.tournamentForm.inicioCampeonato;
            // this.tournament.finishDay = this.tournament.finCampeonato;
            // this.tournament.cantequipos = this.tournamentForm.cantEquipos;
            // this.tournament.inscriptionFee = this.tournamentForm.fee;
            // console.log("el form", this.tournament);
            //   this.tournamentForm._idClubId = this.idClub;
            this.tournamentService.create(this.tournamentForm).subscribe(function (data) {
                _this.alertService.success('se guardaron los cambios', true),
                    console.log('el form', _this.tournamentForm);
            }, function (error) {
                _this.alertService.error('ha ocurrido un error', false);
            });
        }
    };
    TournamentDefinitionComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'tournament-definition.component.html',
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, tournament_service_1.TournamentService,
            alert_service_1.AlertService])
    ], TournamentDefinitionComponent);
    return TournamentDefinitionComponent;
}());
exports.TournamentDefinitionComponent = TournamentDefinitionComponent;
//# sourceMappingURL=tournament-definition.component.js.map