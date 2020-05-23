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
var forms_1 = require("@angular/forms");
var ng2_validation_1 = require("ng2-validation");
var core_2 = require("@agm/core");
var validate_all_fields_1 = require("../_helpers/validate-all-fields");
/*ng-chhips*/
require("rxjs/add/operator/filter");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/map");
require("rxjs/add/observable/of");
require("rxjs/add/operator/first");
var index_1 = require("../_services/index");
var Observable_1 = require("rxjs/Observable");
var field_form_array_component_1 = require("./field-form-array.component");
var validate_password_1 = require("../_helpers/validate-password");
var RegisterClubComponent = /** @class */ (function () {
    function RegisterClubComponent(router, clubService, alertService, fb, mapsAPILoader, ngZone) {
        this.router = router;
        this.clubService = clubService;
        this.alertService = alertService;
        this.fb = fb;
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.model = {};
        this.loading = false;
        this.galleryToUpload = [];
        this.draggable = true; //Necesario para el que el marcador del mapa se mueva
        this.requestAutocompleteItemsFake = function (text) {
            return Observable_1.Observable.of([
                'Asador', 'Buffet', 'Parking', 'Techado', 'Bar', 'Nocturno'
            ]);
        };
        this.createForm();
    }
    RegisterClubComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.lat = -31.4;
        this.lng = -64.1833;
        this.setCurrentPosition();
        //load Places Autocomplete
        this.mapsAPILoader.load().then(function () {
            var autocomplete = new google.maps.places.Autocomplete(_this.searchElementRef.nativeElement, {
                types: ['address']
            });
            autocomplete.addListener('place_changed', function () {
                _this.ngZone.run(function () {
                    //get the place result
                    var place = autocomplete.getPlace();
                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    //set latitude, longitude and zoom
                    _this.lat = place.geometry.location.lat();
                    _this.lng = place.geometry.location.lng();
                    _this.zoom = 16;
                    _this.registerClubForm.get('address.lat').setValue(place.geometry.location.lat());
                    _this.registerClubForm.get('address.lng').setValue(place.geometry.location.lng());
                    _this.registerClubForm.get('address.address').setValue(place.formatted_address);
                    console.log(_this.registerClubForm.get('address').value);
                    //this.registerClubForm.get('address.address').setValue(place.
                });
            });
        });
    };
    RegisterClubComponent.prototype.setAutocompleteInput = function () {
        var _this = this;
        var geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(this.lat, this.lng);
        var request = {
            location: latlng
        };
        geocoder.geocode(request, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                console.log('Results: ');
                console.log(results);
                if (results[0] != null) {
                    _this.searchElementRef.nativeElement.value = results[0].formatted_address;
                    _this.registerClubForm.get('address.lat').setValue(results[0].geometry.location.lat());
                    _this.registerClubForm.get('address.lng').setValue(results[0].geometry.location.lng());
                    _this.registerClubForm.get('address.address').setValue(results[0].formatted_address);
                    console.log(_this.registerClubForm.get('address').value);
                }
                else {
                    alert('No address available');
                }
            }
        });
    };
    RegisterClubComponent.prototype.setCurrentPosition = function () {
        var _this = this;
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                _this.lat = position.coords.latitude;
                _this.lng = position.coords.longitude;
                _this.zoom = 16;
                _this.setAutocompleteInput();
            });
        }
    };
    RegisterClubComponent.prototype.createForm = function () {
        this.registerClubForm = this.fb.group({
            user: this.fb.group({
                username: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3)])],
                email: [null, forms_1.Validators.compose([forms_1.Validators.required, ng2_validation_1.CustomValidators.email])],
                password: [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(8)])],
                repeatPassword: [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(8)])]
            }, {
                validator: validate_password_1.PasswordValidation.MatchPassword // your validation method
            }),
            name: [null, forms_1.Validators.required],
            description: [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(255)])],
            phoneNumber: null,
            //address: [null, Validators.required],
            address: this.fb.group({
                lat: '',
                lng: '',
                address: ''
            }),
            services: [[], forms_1.Validators.required],
            profileImg: [null, forms_1.Validators.required],
            galleryImg: [null, forms_1.Validators.required],
            socialMedia: this.fb.group({
                facebookId: null,
                twitterId: null,
                instagramId: null,
                googleId: null
            }),
            fields: field_form_array_component_1.FieldFormArrayComponent.initFields()
        });
    };
    RegisterClubComponent.prototype.profileUploaded = function (file) {
        this.filesToUpload = file.file;
        this.registerClubForm.controls['profileImg'].setValue(true);
    };
    RegisterClubComponent.prototype.galleryUploaded = function (file) {
        console.log(file);
        this.galleryToUpload.push(file.file);
        console.log(this.galleryToUpload);
        this.registerClubForm.controls['galleryImg'].setValue(true);
    };
    RegisterClubComponent.prototype.galleryRemoved = function (file) {
        for (var i = 0; i < this.galleryToUpload.length; i++) {
            if (this.galleryToUpload[i].lastModified === file.file.lastModified) {
                this.galleryToUpload.splice(i, 1);
                console.log(this.galleryToUpload);
                break;
            }
        }
        if (this.galleryToUpload.length === 0) {
            this.registerClubForm.controls['galleryImg'].setValue(null);
        }
    };
    RegisterClubComponent.prototype.profileRemoved = function () {
        this.registerClubForm.controls['profileImg'].setValue(null);
        this.filesToUpload = null;
        console.log(this.registerClubForm.controls['profileImg']);
    };
    /*FIELDS*/
    RegisterClubComponent.prototype.initFields = function () {
        return this.fb.group({
            description: '',
            cantPlayers: '',
            services: []
        });
    };
    RegisterClubComponent.prototype.addFields = function () {
        // add address to the list
        var control = this.registerClubForm.controls['fields'];
        control.push(this.initFields());
    };
    RegisterClubComponent.prototype.removeFields = function (i) {
        // remove address from the list
        var control = this.registerClubForm.controls['fields'];
        control.removeAt(i);
    };
    RegisterClubComponent.prototype.registerClub = function () {
        var _this = this;
        if (this.registerClubForm.valid) {
            this.loading = true;
            var formData = new FormData();
            var file = this.filesToUpload;
            var gallery = this.galleryToUpload;
            formData.append('profile', file, file['name']);
            for (var i = 0; i < gallery.length; i++) {
                formData.append('gallery', gallery[i], gallery[i].name);
            }
            formData.append('body', JSON.stringify(this.registerClubForm.value));
            this.clubService.create(formData)
                .subscribe(function (data) {
                _this.alertService.success('Registración Exitosa', true);
                _this.router.navigate(['/login']);
            }, function (error) {
                _this.alertService.error(error);
                _this.loading = false;
            });
        }
        else {
            validate_all_fields_1.ValidateAllFields.validateAllFields(this.registerClubForm);
        }
    };
    //El primer click sobre el mapa
    RegisterClubComponent.prototype.clickMapa = function (e) {
        console.log(e);
        this.lng = e.coords.lng;
        this.lat = e.coords.lat;
        this.setAutocompleteInput();
        console.log('lat' + this.lat, 'long' + this.lng);
        //     this.registerClubForm.address.lat = e.coords.lat;
        //     this.registerClubForm.address.lng=e.coords.lng;
    };
    //se actualiza la ubicacion de lat y log al terminar de arrastrar el marcador
    RegisterClubComponent.prototype.nuevaPosicionMarcador = function (e) {
        this.lat = e.coords.lat;
        this.lng = e.coords.lng;
        this.setAutocompleteInput();
        console.log('nueva lat ' + this.lat, 'nueva lng' + this.lng);
    };
    __decorate([
        core_1.ViewChild('address'),
        __metadata("design:type", core_1.ElementRef)
    ], RegisterClubComponent.prototype, "searchElementRef", void 0);
    RegisterClubComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'register-club.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router,
            index_1.ClubService,
            index_1.AlertService,
            forms_1.FormBuilder,
            core_2.MapsAPILoader,
            core_1.NgZone])
    ], RegisterClubComponent);
    return RegisterClubComponent;
}());
exports.RegisterClubComponent = RegisterClubComponent;
//# sourceMappingURL=register-club.component.js.map