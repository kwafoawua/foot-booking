"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var ngx_chips_1 = require("ngx-chips");
var animations_1 = require("@angular/platform-browser/animations"); // this is needed!
var ngx_charts_1 = require("@swimlane/ngx-charts");
var angular2_image_upload_1 = require("angular2-image-upload");
var ng2_validation_1 = require("ng2-validation");
var module_1 = require("./_helpers/demo-utils/module");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
var index_1 = require("./_helpers/index");
var index_2 = require("./_directives/index");
var index_3 = require("./_guards/index");
var index_4 = require("./_services/index");
var index_5 = require("./home/index");
var index_6 = require("./login/index");
var index_7 = require("./register-club/index");
var site_header_component_1 = require("./site-header/site-header.component");
var site_footer_component_1 = require("./site-footer/site-footer.component");
var clubProfileClient_component_1 = require("./ClubProfileClient/clubProfileClient.component");
var index_8 = require("./result/index");
var search_service_1 = require("./_services/search.service");
var booking_service_1 = require("./_services/booking.service");
var index_9 = require("./register-player/index");
var index_10 = require("./admin-club/index");
var profile_club_module_1 = require("./profile-club/profile-club.module");
var profile_player_module_1 = require("./profile-player/profile-player.module");
var angular_calendar_1 = require("angular-calendar");
var index_11 = require("./fields-management/index");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var booking_player_component_1 = require("./booking-player/booking-player.component");
var index_12 = require("./estadisticas-club/index");
var commentsComponent_1 = require("./_directives/Comments/commentsComponent");
var comment_service_1 = require("./_services/comment.service");
//API MAPS
var core_2 = require("@agm/core");
var ng2_date_picker_1 = require("ng2-date-picker");
var confirmation_component_1 = require("./booking-confirmation/confirmation.component");
var tournament_service_1 = require("./_services/tournament.service");
var tournament_module_1 = require("./tournament/tournament.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                app_routing_1.routing,
                forms_1.ReactiveFormsModule,
                ngx_chips_1.TagInputModule,
                ngx_charts_1.NgxChartsModule,
                animations_1.BrowserAnimationsModule,
                angular2_image_upload_1.ImageUploadModule.forRoot(),
                ng2_validation_1.CustomFormsModule,
                ng2_date_picker_1.DpDatePickerModule,
                core_2.AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyBuNW_HnnPaMrMq8KGEhiEzUnbVOO_OJzA',
                    libraries: ["places"]
                }),
                profile_club_module_1.ProfileClubModule,
                profile_player_module_1.ProfilePlayerModule,
                angular_calendar_1.CalendarModule.forRoot(),
                ng_bootstrap_1.NgbModule.forRoot(),
                module_1.DemoUtilsModule,
                tournament_module_1.TournamentModule
            ],
            declarations: [
                app_component_1.AppComponent,
                index_2.AlertComponent,
                index_5.HomeComponent,
                index_6.LoginComponent,
                index_7.RegisterClubComponent,
                index_9.RegisterPlayerComponent,
                site_header_component_1.SiteHeaderComponent,
                site_footer_component_1.SiteFooterComponent,
                clubProfileClient_component_1.ProfileClubClientComponent,
                index_8.ResultComponent,
                index_7.FieldFormArrayComponent,
                index_7.FieldFormControlComponent,
                index_10.AdminClubComponent,
                confirmation_component_1.confirmationComponent,
                index_11.FieldsManagementComponent,
                index_12.EstadisticasClubComponent,
                booking_player_component_1.bookingPlayerComponent,
                commentsComponent_1.commentsComponent
            ],
            providers: [
                index_1.customHttpProvider,
                index_3.AuthGuard,
                index_4.AlertService,
                index_4.AuthenticationService,
                index_4.UserService,
                index_4.ClubService,
                index_4.PlayerService,
                search_service_1.SearchService,
                booking_service_1.BookingService,
                comment_service_1.CommentService,
                tournament_service_1.TournamentService
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map