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
var alert_service_1 = require("../../_services/alert.service");
var club_service_1 = require("../../_services/club.service");
var router_1 = require("@angular/router");
var user_service_1 = require("../../_services/user.service");
var field_form_array_component_1 = require("./field-form-array.component");
/**
 * Created by pablo on 6/11/2017.
 */
var ProfileClubCanchasComponent = /** @class */ (function () {
    function ProfileClubCanchasComponent(router, clubService, alertService, fb, userService) {
        this.router = router;
        this.clubService = clubService;
        this.alertService = alertService;
        this.fb = fb;
        this.userService = userService;
        this.user = {};
        this.club = {};
        this.fields = [];
        /*Fields for Update, Delete, Insert*/
        this.deletedFields = [];
        this.modifiedFields = [];
        this.newFields = [];
    }
    ProfileClubCanchasComponent.prototype.ngOnInit = function () {
        this.createForm(1);
        this.username = JSON.parse(localStorage.getItem('currentUser')).username;
        this.getClub(this.username);
    };
    ProfileClubCanchasComponent.prototype.createForm = function (cantFields) {
        this.fieldClubForm = this.fb.group({
            fields: field_form_array_component_1.FieldFormArrayComponent.initFields(cantFields)
        });
        console.log(this.fieldClubForm);
    };
    ProfileClubCanchasComponent.prototype.getClub = function (username) {
        var _this = this;
        this.userService.getByUsername(username).subscribe(function (userClub) {
            _this.club = userClub.creator;
            // console.log(this.club);
            _this.createForm(_this.club.fields.length);
            _this.fieldClubForm.patchValue({
                fields: _this.club.fields
            });
            // console.log(this.fieldClubForm);
        });
    };
    ProfileClubCanchasComponent.prototype.createTemporalField = function (field) {
        var cancha = {};
        cancha.fieldName = field.fieldName;
        cancha.cantPlayers = field.cantPlayers;
        cancha.fieldType = field.fieldType;
        cancha.services = field.services;
        cancha.price = field.price;
        if (field._id !== '') {
            cancha._id = field._id;
        }
        return cancha;
    };
    ProfileClubCanchasComponent.prototype.updateFieldData = function () {
        var _this = this;
        if (this.fieldClubForm.valid) {
            var index = 0;
            for (var _i = 0, _a = this.fieldClubForm.controls['fields'].value; _i < _a.length; _i++) {
                var field = _a[_i];
                var fieldFormDirty = this.fieldClubForm.controls['fields'].controls[index].dirty;
                if (fieldFormDirty && field._id != '') {
                    var cancha = this.createTemporalField(field);
                    this.modifiedFields.push(cancha);
                }
                else if (field._id == '') {
                    var cancha = this.createTemporalField(field);
                    this.newFields.push(cancha);
                }
                index++;
                // console.log(field);
            }
            var canchas = {};
            canchas.modifiedFields = this.modifiedFields;
            canchas.deletedFields = this.deletedFields;
            canchas.newFields = this.newFields;
            console.log(canchas);
            this.clubService.updateFields(this.club._id, canchas).subscribe(function (data) {
                _this.alertService.success('Los datos se actualizaron correctamente', true);
            }, function (error) {
                _this.alertService.error(error);
                _this.loading = false;
            });
        }
        this.fields = [];
        this.modifiedFields = [];
        this.newFields = [];
    };
    ProfileClubCanchasComponent.prototype.setDeletedFields = function ($event) {
        this.deletedFields.push($event);
        console.log(this.deletedFields);
    };
    ProfileClubCanchasComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'profile-club-canchas.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router,
            club_service_1.ClubService,
            alert_service_1.AlertService,
            forms_1.FormBuilder,
            user_service_1.UserService])
    ], ProfileClubCanchasComponent);
    return ProfileClubCanchasComponent;
}());
exports.ProfileClubCanchasComponent = ProfileClubCanchasComponent;
//# sourceMappingURL=profile-club-canchas.component.js.map