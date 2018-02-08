import { Component, ElementRef, NgZone, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { } from 'googlemaps';
import { MapsAPILoader,AgmCoreModule } from '@agm/core';

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
import {FieldFormArrayComponent} from "./field-form-array.component";

@Component({
    moduleId: module.id,
    templateUrl: 'register-club.component.html'
})

export class RegisterClubComponent implements OnInit{
    model: any = {};
    loading = false;
    registerClubForm: FormGroup;
    filesToUpload: File;
    galleryToUpload: File[] = [];
    lat:number;
    lng:number;
    icon: '../../images/icon/iconochico.png';
    zoom: number;
    draggable:boolean=true; //Necesario para el que el marcador del mapa se mueva



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
        this.lat = -31.4;
        this.lng = -64.1833;

        this.setCurrentPosition();

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

                    this.lat = place.geometry.location.lat();
                    this.lng = place.geometry.location.lng();
                    this.zoom = 16;

                    this.registerClubForm.get('address.lat').setValue(place.geometry.location.lat());
                    this.registerClubForm.get('address.lng').setValue(place.geometry.location.lng());
                    this.registerClubForm.get('address.address').setValue(place.formatted_address);
                    console.log(this.registerClubForm.get('address').value);
                    //this.registerClubForm.get('address.address').setValue(place.
                });
            });
        });
    }

    setAutocompleteInput() {
        let geocoder = new google.maps.Geocoder();
        let latlng = new google.maps.LatLng(this.lat, this.lng);
        let request = {
            location: latlng
        };
        geocoder.geocode(request, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
                console.log('Results: ');
                console.log(results);
                if (results[0] != null) {
                    this.searchElementRef.nativeElement.value = results[0].formatted_address;
                    this.registerClubForm.get('address.lat').setValue(results[0].geometry.location.lat());
                    this.registerClubForm.get('address.lng').setValue(results[0].geometry.location.lng());
                    this.registerClubForm.get('address.address').setValue(results[0].formatted_address);
                    console.log(this.registerClubForm.get('address').value);

                } else {
                    alert("No address available");
                }
            }
        });
    }

    private setCurrentPosition() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;
                this.zoom = 16;
                this.setAutocompleteInput();
            });
        }
    }


    createForm() {
        this.registerClubForm = this.fb.group({
            user: this.fb.group({
                username: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
                email: [null, Validators.compose([Validators.required,CustomValidators.email ])],
                password: [null,Validators.compose([Validators.required, Validators.minLength(8)])],//falta validar contraseña
                repeatPassword: [null,Validators.compose([Validators.required, Validators.minLength(8)])]
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
            galleryImg: null,
            socialMedia: this.fb.group({
                facebookId: null,
                twitterId: null,
                instagramId: null,
                googleId: null

            }),
            fields: FieldFormArrayComponent.initFields()
        });
    }

    public requestAutocompleteItemsFake = (text: string): Observable<string[]> => {
            return Observable.of([
                'Asador', 'Buffet', 'Parking', 'Techado', 'Bar', 'Nocturno'
            ]);
        };

    public profileUploaded(file: FileHolder) {
       this.filesToUpload = file.file;
        this.registerClubForm.controls['profileImg'].setValue(true);
    }

    public galleryUploaded(file: FileHolder) {
        console.log(file);
        this.galleryToUpload.push(file.file);
        console.log(this.galleryToUpload);
        this.registerClubForm.controls['galleryImg'].setValue(true);
    }

    public galleryRemoved (file: FileHolder) {
        for(let i = 0; i < this.galleryToUpload.length; i++){
            if((<any>this).galleryToUpload[i].lastModified === (<any>file).file.lastModified){
                this.galleryToUpload.splice(i,1);
                console.log(this.galleryToUpload);
                break;
            }
        }
        if(this.galleryToUpload.length === 0){
            this.registerClubForm.controls['galleryImg'].setValue(null);
        }
    }

    public profileRemoved () {
        this.registerClubForm.controls['profileImg'].setValue(null);
        this.filesToUpload = null;
        console.log(this.registerClubForm.controls['profileImg'])
    }
    /*FIELDS*/
    initFields() {

        return this.fb.group({
            description: '',
            cantPlayers: '',
            services: []
        });
    }

    public addFields() {
        // add address to the list
        const control = <FormArray>this.registerClubForm.controls['fields'];
        control.push(this.initFields());
    }

    public removeFields(i: number) {
        // remove address from the list
        const control = <FormArray>this.registerClubForm.controls['fields'];
        control.removeAt(i);
    }

    registerClub (){
        if(this.registerClubForm.valid){
            this.loading = true;

            const formData: any = new FormData();
            const file: File = this.filesToUpload;
            const gallery: File[] = this.galleryToUpload;

            formData.append("profile", file, file['name']);
            for(let i = 0; i < gallery.length ; i++){
                formData.append("gallery", gallery[i], gallery[i].name);
            }
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


    //El primer click sobre el mapa
    clickMapa(e){

    console.log(e)
        this.lng=e.coords.lng;
        this.lat=e.coords.lat;
        this.setAutocompleteInput();

        console.log("lat" + this.lat, "long" + this.lng);
    //     this.registerClubForm.address.lat = e.coords.lat;
    //     this.registerClubForm.address.lng=e.coords.lng;
     }

     //se actualiza la ubicacion de lat y log al terminar de arrastrar el marcador
    nuevaPosicionMarcador(e){
        this.lat= e.coords.lat;
        this.lng = e.coords.lng;
        this.setAutocompleteInput();
        console.log("nueva lat " + this.lat, "nueva lng" + this.lng);


    }



   comparePassword = (control: FormControl): { [s:string]:boolean} => {
        let formulario: any = this;
        console.log(this.registerClubForm);
        if(control.value !== formulario.get('user.password').value){
            return {
                noiguales : false
            }
        }
    };



}
