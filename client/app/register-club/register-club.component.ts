import { Component, ElementRef, NgZone, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

/*ng-chhips*/
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/first';

import { AlertService, ClubService } from '../_services/index';
import {Observable} from "rxjs/Observable";
import {isUndefined} from "util";
import {FileHolder} from "angular2-image-upload/lib/image-upload/image-upload.component";

@Component({
    moduleId: module.id,
    templateUrl: 'register-club.component.html'
})

export class RegisterClubComponent implements OnInit{
    model: any = {};
    loading = false;
    registerClubForm: FormGroup;
    filesToUpload: File;


    @ViewChild("address")
    public searchElementRef: ElementRef;

    constructor(
        private router: Router,
        private clubService: ClubService,
        private alertService: AlertService,
        private fb: FormBuilder,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone) {
        this.createForm();
    }

    ngOnInit() {
        //load Places Autocomplete
        this.mapsAPILoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ["address"]
            });
            autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    //get the place result
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }

                    //set latitude, longitude and zoom
                    this.registerClubForm.get('address.lat').setValue(place.geometry.location.lat());
                    this.registerClubForm.get('address.lng').setValue(place.geometry.location.lng());
                    this.registerClubForm.get('address.address').setValue(place.formatted_address);
                    console.log(this.registerClubForm.get('address').value);
                    //this.registerClubForm.get('address.address').setValue(place.
                });
            });
        });
    }

    register() {
        this.loading = true;
        this.clubService.create(this.registerClubForm.value)
            .subscribe(
                data => {
                    this.alertService.success('Registración Exitosa', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    createForm() {
        this.registerClubForm = this.fb.group({
            user: this.fb.group({
                username: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
                email: [null, Validators.compose([Validators.required,CustomValidators.email ])],
                password: [null,Validators.compose([Validators.required, Validators.minLength(8)])],//falta validar contraseña
            }),
            name: [null, Validators.required],
            description: [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
            phoneNumber: null,
            //address: [null, Validators.required],
            address: this.fb.group({
                lat: '',
                lng:'',
                address: ''
            }),
            services: [[], Validators.required],
            profileImg: [null, Validators.required],
            //galleryImg: [],
            field: this.fb.group({//cancha
                fieldName: null,
                services: [],
                fieldImg: null
            }),
            socialMedia: this.fb.group({
                facebookId: null,
                twitterId: null,
                instagramId: null,
                googleId: null

            })
        });
    }

    public requestAutocompleteItemsFake = (text: string): Observable<string[]> => {
            return Observable.of([
                'Asador', 'Buffet', 'Parking', 'Techado', 'Bar', 'Nocturno'
            ]);
        };

    /*public profileUploaded(file: FileHolder) {
       // this.registerClubForm.controls['profileImg'].setValue(file);
        this.clubService.upload(file.target);
        console.log(file);
    }*/

    public profileRemoved (file: FileHolder) {
        this.registerClubForm.controls['profileImg'].setValue(null);
        console.log(this.registerClubForm.controls['profileImg'])
    }

    upload() {
        const formData: any = new FormData();
        const file: File = this.filesToUpload;

        formData.append("image", file, file['name']);
        formData.append(this.registerClubForm.value);

        this.clubService.upload(formData)
            .map(file => file.json())
            .subscribe(file => console.log('files', file))
    }

    fileChangeEvent(file: FileHolder) {
        //this.filesToUpload = fileInput.target.files[0];
        this.filesToUpload = file.file;
        this.registerClubForm.controls['profileImg'].setValue(true);

        //this.upload();
        //this.product.photo = fileInput.target.files[0]['name'];
    }

    registerClub (){
        if(this.registerClubForm.valid){
            this.loading = true;

            const formData: any = new FormData();
            const file: File = this.filesToUpload;

            formData.append("image", file, file['name']);
            formData.append("body",JSON.stringify(this.registerClubForm.value) );


            this.clubService.create(formData)
                .subscribe(
                    data => {
                        this.alertService.success('Registración Exitosa', true);
                        this.router.navigate(['/login']);
                    },
                    error => {
                        this.alertService.error(error);
                        this.loading = false;
                    });
        } else {
            this.validateAllFields(this.registerClubForm);
        }
    }

    validateAllFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFields(control);
            }
        });
    }

   /* comparePassword = (control: FormControl): { [s:string]:boolean} => {
        let formulario: any = this;
        console.log(this.registerClubForm);
        if(control.value !== formulario.get('user.password').value){
            return {
                noiguales : false
            }
        }
    };*/


    public galleryUploaded (file: FileHolder) {
        this.registerClubForm.controls['galleryImg'].setValue(file);
    }

}
