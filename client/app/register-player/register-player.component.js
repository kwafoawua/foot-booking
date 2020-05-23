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
var RegisterPlayerComponent = /** @class */ (function () {
    function RegisterPlayerComponent(router, playerService, alertService) {
        this.router = router;
        this.playerService = playerService;
        this.alertService = alertService;
        this.model = {};
        this.loading = false;
    }
    //    submitted = false;
    //    onSubmit() { this.submitted = true; }
    RegisterPlayerComponent.prototype.registerPlayer = function () {
        var _this = this;
        this.loading = true;
        this.playerService.create(this.model)
            .subscribe(function (data) {
            _this.alertService.success('Registración Exitosa', true);
            _this.router.navigate(['/login']);
        }, function (error) {
            _this.alertService.error(error);
            _this.loading = false;
        });
    };
    RegisterPlayerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            //selector: playerForm,
            templateUrl: 'register-player.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router,
            index_1.PlayerService,
            index_1.AlertService])
    ], RegisterPlayerComponent);
    return RegisterPlayerComponent;
}());
exports.RegisterPlayerComponent = RegisterPlayerComponent;
//# sourceMappingURL=register-player.component.js.map