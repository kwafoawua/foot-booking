"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var index_1 = require("./home/index");
var index_2 = require("./login/index");
var index_3 = require("./register-club/index");
var clubProfileClient_component_1 = require("./ClubProfileClient/clubProfileClient.component");
var index_4 = require("./register-player/index");
var index_5 = require("./profile-player/index");
var index_6 = require("./_guards/index");
var confirmation_component_1 = require("./booking-confirmation/confirmation.component");
var index_7 = require("./result/index");
var index_8 = require("./admin-club/index");
var booking_player_component_1 = require("./booking-player/booking-player.component");
// Routes for child routing
var index_9 = require("./fields-management/index");
var index_10 = require("./estadisticas-club/index");
var tournament_definition_component_1 = require("./tournament/tournament-definition/tournament-definition.component");
var tournament_stage_component_1 = require("./tournament/tournament-stage/tournament-stage.component");
var appRoutes = [
    { path: '', component: index_1.HomeComponent },
    { path: 'login', component: index_2.LoginComponent },
    { path: 'results/club/:id', component: clubProfileClient_component_1.ProfileClubClientComponent },
    { path: 'confirmation', component: confirmation_component_1.confirmationComponent },
    { path: 'player/register', component: index_4.RegisterPlayerComponent },
    { path: 'profile-player/:id', component: index_5.ProfilePlayerComponent, canActivate: [index_6.AuthGuard] },
    { path: 'results', component: index_7.ResultComponent },
    { path: 'club/register', component: index_3.RegisterClubComponent },
    { path: 'club/admin', component: index_8.AdminClubComponent, canActivate: [index_6.AuthGuard] },
    { path: 'club/estadisticas', component: index_10.EstadisticasClubComponent },
    { path: 'club/gestion-canchas', component: index_9.FieldsManagementComponent },
    { path: 'player/mis-reservas', component: booking_player_component_1.bookingPlayerComponent },
    { path: 'nuevo-campeonato', component: tournament_definition_component_1.TournamentDefinitionComponent },
    { path: 'campeonato/administrar-fases', component: tournament_stage_component_1.TournamentStageComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map