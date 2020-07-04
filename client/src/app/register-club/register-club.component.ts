import { Component, ElementRef, NgZone, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import {} from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { ValidateAllFields } from '../_helpers/validate-all-fields';
import { AlertService, AuthService, ClubService } from '../_services/index';
import { Observable, of } from 'rxjs';
import { FileHolder } from 'angular2-image-upload';
import { FieldFormArrayComponent } from '../fields-array';
import { PasswordValidation } from '../_helpers/validate-password';
import { FirebaseErrorHandler } from '../_helpers/firebaseErrorHandler';
import { StorageService } from '../_services/storage.service';

declare var google: any;

@Component({
  templateUrl: 'register-club.component.html'
})

export class RegisterClubComponent implements OnInit {
  model: any = {};
  loading = false;
  registerClubForm: FormGroup;
  filesToUpload: File;
  galleryToUpload: File[] = [];
  lat: number;
  lng: number;
  icon: '../../assets/icon/iconochico.png';
  zoom: number;
  draggable = true; //Necesario para el que el marcador del mapa se mueva


  @ViewChild('address')
  public searchElementRef: ElementRef;

  constructor(
    private router: Router,
    private clubService: ClubService,
    private alertService: AlertService,
    private fb: FormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private authService: AuthService,
    private storageService: StorageService,
    ) {
    this.createForm();
  }

  ngOnInit() {

    this.lat = -31.4;
    this.lng = -64.1833;

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentPosition();
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: [ 'address' ]
      });
      autocomplete.addListener('place_changed', () => {
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
    const geocoder = new google.maps.Geocoder();
    const latlng = new google.maps.LatLng(this.lat, this.lng);
    const request = {
      location: latlng
    };
    geocoder.geocode(request, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {

        if (results[0] != null) {
          let city = '';
          let country = '';
          let provincia = '';
          this.searchElementRef.nativeElement.value = results[ 0 ].formatted_address;
          this.registerClubForm.get('address.lat').setValue(results[ 0 ].geometry.location.lat());
          this.registerClubForm.get('address.lng').setValue(results[ 0 ].geometry.location.lng());
          this.registerClubForm.get('address.address').setValue(results[ 0 ].formatted_address);
          results[0].address_components.forEach(addr => {
            switch (addr.types[0]) {
              case 'administrative_area_level_2':
                city = addr.short_name;
                break;
              case 'administrative_area_level_1':
                provincia = addr.short_name;
                break;
              case 'country':
                country = addr.long_name;
            }
          });
          this.registerClubForm.get('address.shortAddress').setValue(`${city}, ${provincia}, ${country}`);

        } else {
          alert('No address available');
        }
      }
    });
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
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
        email: [ null, Validators.compose([ Validators.required, CustomValidators.email ]) ],
        password: [ null, Validators.compose([ Validators.required, Validators.minLength(8) ]) ],//falta validar contraseña
        repeatPassword: [ null, Validators.compose([ Validators.required, Validators.minLength(8) ]) ]
      }, {
        validator: PasswordValidation.MatchPassword // your validation method
      }),
      uid: [null],
      name: [ null, Validators.required ],
      description: [ null, Validators.compose([ Validators.required, Validators.maxLength(255) ]) ],
      phoneNumber: [ null, Validators.required ],
      address: this.fb.group({
        lat: '',
        lng: '',
        address: '',
        shortAddress: '',
      }),
      services: [ [], Validators.required ],
      profileImg: [ null, Validators.required ],
      galleryImg: [ null, Validators.required ],
      socialMedia: this.fb.group({
        facebookId: null,
        twitterId: null,
        instagramId: null,
        googleId: null

      }),
      fields: FieldFormArrayComponent.initFields()
    });
  }

  public requestAutocompleteItemsFake = () =>
    [ 'Asador', 'Buffet', 'Parking', 'Techado', 'Bar', 'Nocturno' ];

  public profileUploaded(file: FileHolder) {
    this.filesToUpload = file.file;
    this.registerClubForm.controls[ 'profileImg' ].setValue(true);
  }

  public galleryUploaded(file: FileHolder) {
    console.log(file);
    this.galleryToUpload.push(file.file);
    console.log(this.galleryToUpload);
    this.registerClubForm.controls[ 'galleryImg' ].setValue(true);
  }

  public galleryRemoved(file: FileHolder) {
    for (let i = 0; i < this.galleryToUpload.length; i++) {
      if ((<any>this).galleryToUpload[ i ].lastModified === (<any>file).file.lastModified) {
        this.galleryToUpload.splice(i, 1);
        console.log(this.galleryToUpload);
        break;
      }
    }
    if (this.galleryToUpload.length === 0) {
      this.registerClubForm.controls[ 'galleryImg' ].setValue(null);
    }
  }

  public profileRemoved() {
    this.registerClubForm.controls[ 'profileImg' ].setValue(null);
    this.filesToUpload = null;
    console.log(this.registerClubForm.controls[ 'profileImg' ])
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
    const control = <FormArray>this.registerClubForm.controls[ 'fields' ];
    control.push(this.initFields());
  }

  public removeFields(i: number) {
    // remove address from the list
    const control = <FormArray>this.registerClubForm.controls[ 'fields' ];
    control.removeAt(i);
  }

  async registerClub() {
    if (this.registerClubForm.valid) {
      try {
        this.loading = true;

        const formData: any = new FormData();
        const file: File = this.filesToUpload;
        const gallery: File[] = this.galleryToUpload;

        formData.append('profile', file, file[ 'name' ]);
        for (let i = 0; i < gallery.length; i++) {
          formData.append('gallery', gallery[ i ], gallery[ i ].name);
        }
        const email = this.registerClubForm.get('user.email').value;
        const password = this.registerClubForm.get('user.password').value;
        const newUser = await this.authService.firebaseRegister(email, password);
        this.registerClubForm.controls['uid'].setValue(newUser.user.uid);
        formData.append('body', JSON.stringify(this.registerClubForm.value));

        this.clubService.create(formData)
          .subscribe((data) => {
              const {user, success} = data as any;
              this.alertService.success(success, true);
              this.storageService.store('currentUser', user);
              this.router.navigate([ '/' ]);
            },
            error => {
              this.alertService.error(error);
              this.loading = false;
            });
      } catch (err) {
        const error = FirebaseErrorHandler.signUpErrorHandler(err.code);
        this.alertService.error(error);
        this.loading = false;      }

    } else {
      ValidateAllFields.validateAllFields(this.registerClubForm);
    }
  }


  //El primer click sobre el mapa
  clickMapa(e) {
    this.lng = e.coords.lng;
    this.lat = e.coords.lat;
    this.setAutocompleteInput();

    console.log('lat' + this.lat, 'long' + this.lng);
    //     this.registerClubForm.address.lat = e.coords.lat;
    //     this.registerClubForm.address.lng=e.coords.lng;
  }

  //se actualiza la ubicacion de lat y log al terminar de arrastrar el marcador
  nuevaPosicionMarcador(e) {
    this.lat = e.coords.lat;
    this.lng = e.coords.lng;
    this.setAutocompleteInput();
    console.log('nueva lat ' + this.lat, 'nueva lng' + this.lng);


  }

}
