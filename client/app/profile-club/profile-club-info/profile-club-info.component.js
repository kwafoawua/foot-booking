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
var index_1 = require("../../_services/index");
var forms_1 = require("@angular/forms");
var core_2 = require("@agm/core");
/*ng-chhips*/
require("rxjs/add/operator/filter");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/map");
require("rxjs/add/observable/of");
require("rxjs/add/operator/first");
var Observable_1 = require("rxjs/Observable");
var validate_all_fields_1 = require("../../_helpers/validate-all-fields");
var ProfileClubInfoComponent = /** @class */ (function () {
    function ProfileClubInfoComponent(userService, clubService, fb, mapsAPILoader, alertService, ngZone) {
        this.userService = userService;
        this.clubService = clubService;
        this.fb = fb;
        this.mapsAPILoader = mapsAPILoader;
        this.alertService = alertService;
        this.ngZone = ngZone;
        this.profileImage = [];
        this.profileGallery = [];
        this.galleryToUpload = [];
        this.loading = false;
        this.requestAutocompleteItemsFake = function (text) {
            return Observable_1.Observable.of([
                'Asador', 'Buffet', 'Parking', 'Techado', 'Bar', 'Nocturno'
            ]);
        };
    }
    ProfileClubInfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.createForm();
        this.username = JSON.parse(localStorage.getItem('currentUser')).username;
        this.getClub(this.username);
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
                    _this.clubForm.get('address.lat').setValue(place.geometry.location.lat());
                    _this.clubForm.get('address.lng').setValue(place.geometry.location.lng());
                    _this.clubForm.get('address.address').setValue(place.formatted_address);
                    console.log(_this.clubForm.get('address').value);
                    //this.registerClubForm.get('address.address').setValue(place.
                });
            });
        });
    };
    ProfileClubInfoComponent.prototype.initAddress = function () {
    };
    ProfileClubInfoComponent.prototype.getClub = function (username) {
        var _this = this;
        this.userService.getByUsername(username).subscribe(function (userClub) {
            _this.club = userClub.creator;
            _this.clubForm.setValue({
                _id: _this.club._id,
                name: _this.club.name,
                description: _this.club.description,
                phoneNumber: _this.club.phoneNumber,
                address: _this.club.address,
                services: _this.club.services,
                profileImg: _this.club.profileImg,
                galleryImg: _this.club.galleryImg,
                socialMedia: _this.club.socialMedia,
            });
            if (_this.club.address.address) {
                console.log('entra al iff address addres');
                _this.searchElementRef.nativeElement.value = _this.club.address.address;
            }
            _this.profileImage = [
                '/uploads/' + _this.club.profileImg.replace(/ /g, '%20')
            ];
            console.log(_this.club.galleryImg);
            var relativeGallery = [];
            _this.club.galleryImg.forEach(function (item, index) {
                var newItem = item.replace(/ /g, '%20');
                console.log(newItem);
                var relativePath = '/uploads/' + newItem;
                relativeGallery.push(relativePath);
            });
            _this.profileGallery = relativeGallery;
            console.log(_this.profileGallery);
            console.log(_this.profileImage);
        });
    };
    ProfileClubInfoComponent.prototype.createForm = function () {
        this.clubForm = this.fb.group({
            _id: null,
            name: [null, forms_1.Validators.required],
            description: [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(255)])],
            phoneNumber: null,
            address: this.fb.group({
                lat: null,
                lng: null,
                address: null
            }),
            services: [[], forms_1.Validators.required],
            profileImg: [null, forms_1.Validators.required],
            galleryImg: null,
            socialMedia: this.fb.group({
                facebookId: null,
                twitterId: null,
                instagramId: null,
                googleId: null
            })
        });
    };
    ProfileClubInfoComponent.prototype.profileUploaded = function (file) {
        this.filesToUpload = file.file;
        this.clubForm.controls['profileImg'].setValue(true);
    };
    ProfileClubInfoComponent.prototype.galleryUploaded = function (file) {
        console.log(file);
        this.galleryToUpload.push(file.file);
        console.log(this.galleryToUpload);
        this.clubForm.controls['galleryImg'].setValue(true);
    };
    ProfileClubInfoComponent.prototype.galleryRemoved = function (file) {
        for (var i = 0; i < this.galleryToUpload.length; i++) {
            if (this.galleryToUpload[i].lastModified === file.file.lastModified) {
                this.galleryToUpload.splice(i, 1);
                console.log(this.galleryToUpload);
                break;
            }
        }
        if (this.galleryToUpload.length === 0) {
            this.clubForm.controls['galleryImg'].setValue(null);
        }
    };
    ProfileClubInfoComponent.prototype.profileRemoved = function () {
        this.clubForm.controls['profileImg'].setValue(null);
        this.filesToUpload = null;
        console.log(this.clubForm.controls['profileImg']);
    };
    ProfileClubInfoComponent.prototype.updateClubData = function () {
        var _this = this;
        if (this.clubForm.valid) {
            this.loading = true;
            var formData = new FormData();
            if (this.clubForm.get('profileImg').value == true) {
                var file = this.filesToUpload;
                formData.append('profile', file, file['name']);
            }
            if (this.clubForm.get('galleryImg').value == true) {
                var gallery = this.galleryToUpload;
                for (var i = 0; i < gallery.length; i++) {
                    formData.append('gallery', gallery[i], gallery[i].name);
                }
            }
            formData.append('body', JSON.stringify(this.clubForm.value));
            console.log(formData.get('body'));
            this.clubService.update(this.club._id, formData)
                .subscribe(function (data) {
                _this.alertService.success('Los datos se actualizaron correctamente', true);
            }, function (error) {
                _this.alertService.error(error);
                _this.loading = false;
            });
        }
        else {
            validate_all_fields_1.ValidateAllFields.validateAllFields(this.clubForm);
        }
    };
    __decorate([
        core_1.ViewChild('address'),
        __metadata("design:type", core_1.ElementRef)
    ], ProfileClubInfoComponent.prototype, "searchElementRef", void 0);
    ProfileClubInfoComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'profile-club-info.component.html'
        }),
        __metadata("design:paramtypes", [index_1.UserService,
            index_1.ClubService,
            forms_1.FormBuilder,
            core_2.MapsAPILoader,
            index_1.AlertService,
            core_1.NgZone])
    ], ProfileClubInfoComponent);
    return ProfileClubInfoComponent;
}());
exports.ProfileClubInfoComponent = ProfileClubInfoComponent;
//# sourceMappingURL=profile-club-info.component.js.map