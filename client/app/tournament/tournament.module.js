"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var ngx_chips_1 = require("ngx-chips");
var animations_1 = require("@angular/platform-browser/animations"); // this is needed!
var ng2_date_picker_1 = require("ng2-date-picker");
var game_component_1 = require("./game/game.component");
var stage_component_1 = require("./stage/stage.component");
var tournament_stage_component_1 = require("./tournament-stage/tournament-stage.component");
var game_form_array_component_1 = require("./game/game-form-array.component");
var tournament_routing_module_1 = require("./tournament-routing.module");
var tournament_definition_component_1 = require("./tournament-definition/tournament-definition.component");
var TournamentModule = /** @class */ (function () {
    function TournamentModule() {
    }
    TournamentModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                tournament_routing_module_1.TournamentRoutingModule,
                forms_1.ReactiveFormsModule,
                ngx_chips_1.TagInputModule,
                animations_1.BrowserAnimationsModule,
                ng2_date_picker_1.DpDatePickerModule
            ],
            declarations: [
                tournament_stage_component_1.TournamentStageComponent,
                stage_component_1.StageComponent,
                game_component_1.GameComponent,
                game_form_array_component_1.GameFormArrayComponent,
                tournament_definition_component_1.TournamentDefinitionComponent,
            ],
            providers: []
        })
    ], TournamentModule);
    return TournamentModule;
}());
exports.TournamentModule = TournamentModule;
//# sourceMappingURL=tournament.module.js.map