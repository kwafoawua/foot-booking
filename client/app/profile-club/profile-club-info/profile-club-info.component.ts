/**
 * Created by USUARIO on 16/10/2017.
 */
import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {AlertService, UserService} from "../../_services/index";
import {Club} from "../../_models/club";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

/*ng-chhips*/
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/first';

import {Observable} from "rxjs/Observable";
import {isUndefined} from "util";
import {FileHolder} from "angular2-image-upload/lib/image-upload/image-upload.component";

@Component({
    moduleId: module.id,
    templateUrl: 'profile-club-info.component.html'
})
export class ProfileClubInfoComponent implements OnInit{
    username: string;
    club: Club;
    clubForm : FormGroup;
    filesToUpload: File;
    galleryToUpload: File[] = [];
    constructor (private userService: UserService, private fb: FormBuilder,private mapsAPILoader: MapsAPILoader,
                 private ngZone: NgZone) {

    }

    @ViewChild("address")
    public searchElementRef: ElementRef;

    ngOnInit(){
        this.createForm();
        this.username = JSON.parse(localStorage.getItem('currentUser')).username;
        this.getClub(this.username);

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
                    this.clubForm.get('address.lat').setValue(place.geometry.location.lat());
                    this.clubForm.get('address.lng').setValue(place.geometry.location.lng());
                    this.clubForm.get('address.address').setValue(place.formatted_address);
                    console.log(this.clubForm.get('address').value);
                    //this.registerClubForm.get('address.address').setValue(place.
                });
            });
        });

    }

    private initAddress() {

    }

    private getClub (username: string) {
        this.userService.getByUsername(username).subscribe(userClub => {

            this.club = userClub.creator;
            this.clubForm.setValue({
                name: this.club.name,
                description: this.club.description,
                phoneNumber: this.club.phoneNumber,
                address: this.club.address,
                services: this.club.services,
                profileImg: this.club.profileImg,
                galleryImg: this.club.galleryImg,
                socialMedia: this.club.socialMedia
            });
        });
    }

    createForm() {
        this.clubForm = this.fb.group({
            name: [null, Validators.required],
            description: [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
            phoneNumber: null,
            address: this.fb.group({
                lat: null,
                lng:null,
                address: null
            }),
            services: [[], Validators.required],
            profileImg: [null, Validators.required],
            galleryImg: null,
            socialMedia: this.fb.group({
                facebookId: null,
                twitterId: null,
                instagramId: null,
                googleId: null

            })
        });
    }

    public profileUploaded(file: FileHolder) {
        this.filesToUpload = file.file;
        this.clubForm.controls['profileImg'].setValue(true);
    }

    public galleryUploaded(file: FileHolder) {
        console.log(file);
        this.galleryToUpload.push(file.file);
        console.log(this.galleryToUpload);
        this.clubForm.controls['galleryImg'].setValue(true);
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
            this.clubForm.controls['galleryImg'].setValue(null);
        }
    }

    public profileRemoved () {
        this.clubForm.controls['profileImg'].setValue(null);
        this.filesToUpload = null;
        console.log(this.clubForm.controls['profileImg'])
    }

    public requestAutocompleteItemsFake = (text: string): Observable<string[]> => {
        return Observable.of([
            'Asador', 'Buffet', 'Parking', 'Techado', 'Bar', 'Nocturno'
        ]);
    };

}