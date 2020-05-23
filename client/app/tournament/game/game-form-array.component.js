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
var game_component_1 = require("./game.component");
var GameFormArrayComponent = /** @class */ (function () {
    function GameFormArrayComponent() {
    }
    GameFormArrayComponent.prototype.addGame = function () {
        this.GameFormArray.push(game_component_1.GameComponent.buildGame());
    };
    GameFormArrayComponent.initGames = function () {
        return new forms_1.FormArray([
            game_component_1.GameComponent.buildGame()
        ]);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", forms_1.FormArray)
    ], GameFormArrayComponent.prototype, "GameFormArray", void 0);
    GameFormArrayComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'game-array',
            templateUrl: 'game-form-array.component.html'
        })
    ], GameFormArrayComponent);
    return GameFormArrayComponent;
}());
exports.GameFormArrayComponent = GameFormArrayComponent;
//# sourceMappingURL=game-form-array.component.js.map