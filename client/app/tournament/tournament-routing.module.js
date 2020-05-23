"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var tournament_stage_component_1 = require("./tournament-stage/tournament-stage.component");
var stage_component_1 = require("./stage/stage.component");
var tournament_definition_component_1 = require("./tournament-definition/tournament-definition.component");
var profileClubRoutes = [
    {
        path: 'campeonato/administrar-fases',
        component: tournament_stage_component_1.TournamentStageComponent,
        children: [
            {
                path: 'ronda',
                component: stage_component_1.StageComponent,
            },
        ],
    },
    {
        path: 'campeonato/nuevo',
        component: tournament_definition_component_1.TournamentDefinitionComponent
    },
];
var TournamentRoutingModule = /** @class */ (function () {
    function TournamentRoutingModule() {
    }
    TournamentRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(profileClubRoutes)
            ],
            exports: [
                router_1.RouterModule
            ]
        })
    ], TournamentRoutingModule);
    return TournamentRoutingModule;
}());
exports.TournamentRoutingModule = TournamentRoutingModule;
//# sourceMappingURL=tournament-routing.module.js.map