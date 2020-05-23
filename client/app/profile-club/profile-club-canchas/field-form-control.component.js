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
var Observable_1 = require("rxjs/Observable");
/*ng-chhips*/
require("rxjs/add/operator/filter");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/map");
require("rxjs/add/observable/of");
require("rxjs/add/operator/first");
/**
 * Created by USUARIO on 26/09/2017.
 */
var FieldFormControlComponent = /** @class */ (function () {
    function FieldFormControlComponent() {
        this.cantPlayerSelect = [{ cant: 5, desc: '5 Jugadores' }, { cant: 7, desc: '7 Jugadores' }, {
                cant: 11,
                desc: '11 Jugadores'
            }];
        this.fieldTypeSelect = ['Cesped', 'Sintético', 'Tierra'];
        this.removed = new core_1.EventEmitter();
        this.requestAutocompleteItemsFake = function (text) {
            return Observable_1.Observable.of([
                'Techado', 'Marcador', 'Iluminación'
            ]);
        };
    }
    FieldFormControlComponent.buildField = function () {
        return new forms_1.FormGroup({
            _id: new forms_1.FormControl(''),
            fieldName: new forms_1.FormControl(''),
            cantPlayers: new forms_1.FormControl(''),
            fieldType: new forms_1.FormControl(''),
            services: new forms_1.FormControl([]),
            price: new forms_1.FormControl('')
        });
    };
    FieldFormControlComponent.prototype.onSelectCant = function (cant) {
    };
    FieldFormControlComponent.prototype.onSelectType = function (type) {
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], FieldFormControlComponent.prototype, "index", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", forms_1.FormGroup)
    ], FieldFormControlComponent.prototype, "field", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], FieldFormControlComponent.prototype, "removed", void 0);
    FieldFormControlComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'field-control',
            templateUrl: 'field-form-control.component.html'
        })
    ], FieldFormControlComponent);
    return FieldFormControlComponent;
}());
exports.FieldFormControlComponent = FieldFormControlComponent;
//# sourceMappingURL=field-form-control.component.js.map