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
var animations_1 = require("@angular/platform-browser/animations");
var angular2_image_upload_1 = require("angular2-image-upload");
var ng2_validation_1 = require("ng2-validation");
var index_1 = require("./index");
var profile_player_routing_module_1 = require("./profile-player-routing.module");
var ng2_date_picker_1 = require("ng2-date-picker");
var ProfilePlayerModule = /** @class */ (function () {
    function ProfilePlayerModule() {
    }
    ProfilePlayerModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                profile_player_routing_module_1.ProfilePlayerRoutingModule,
                forms_1.ReactiveFormsModule,
                ngx_chips_1.TagInputModule,
                animations_1.BrowserAnimationsModule,
                angular2_image_upload_1.ImageUploadModule.forRoot(),
                ng2_validation_1.CustomFormsModule,
                ng2_date_picker_1.DpDatePickerModule
            ],
            declarations: [
                index_1.ProfilePlayerComponent,
                index_1.ProfilePlayerInfoComponent,
                index_1.ProfilePlayerEditComponent,
                index_1.ProfilePlayerConfigComponent
            ],
            providers: []
        })
    ], ProfilePlayerModule);
    return ProfilePlayerModule;
}());
exports.ProfilePlayerModule = ProfilePlayerModule;
//# sourceMappingURL=profile-player.module.js.map