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
/**
 * Created by USUARIO on 26/09/2017.
 */
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var field_form_control_component_1 = require("./field-form-control.component");
var FieldFormArrayComponent = /** @class */ (function () {
    function FieldFormArrayComponent() {
        this.deletedFields = new core_1.EventEmitter();
    }
    FieldFormArrayComponent.prototype.addFields = function () {
        this.fieldFormArray.push(field_form_control_component_1.FieldFormControlComponent.buildField());
    };
    FieldFormArrayComponent.initFields = function (cantFields) {
        var fieldArray = [];
        for (var i = 0; i < cantFields; i++) {
            fieldArray.push(field_form_control_component_1.FieldFormControlComponent.buildField());
        }
        return new forms_1.FormArray(fieldArray);
    };
    FieldFormArrayComponent.prototype.removeField = function (event) {
        if (this.fieldFormArray.value[event]._id !== '') {
            console.log(this.fieldFormArray.value[event]._id);
            this.deletedFields.emit(this.fieldFormArray.value[event]._id);
            this.fieldFormArray.removeAt(event);
        }
        else {
            console.log(this.fieldFormArray.value[event]);
            this.fieldFormArray.removeAt(event);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", forms_1.FormArray)
    ], FieldFormArrayComponent.prototype, "fieldFormArray", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], FieldFormArrayComponent.prototype, "deletedFields", void 0);
    FieldFormArrayComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'fields-array',
            templateUrl: 'field-form-array.component.html'
        })
    ], FieldFormArrayComponent);
    return FieldFormArrayComponent;
}());
exports.FieldFormArrayComponent = FieldFormArrayComponent;
//# sourceMappingURL=field-form-array.component.js.map