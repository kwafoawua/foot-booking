import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { AlertService, ClubService } from '../../_services/index';
import { Club } from '../../_models/club';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {} from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { Observable, of } from 'rxjs';
import { FieldFormArrayComponent } from '../../fields-array';
import { ValidateAllFields } from '../../_helpers/validate-all-fields';
import { FileHolder } from 'angular2-image-upload';
import { environment } from '../../../environments/environment';
import { StorageService } from '../../_services/storage.service';

@Component({
  templateUrl: 'profile-club-info.component.html'
})
export class ProfileClubInfoComponent implements OnInit {
  id: string;
  club: Club;
  clubForm: FormGroup;
  filesToUpload: File;
  profileImage = [];
  profileGallery = [];
  galleryToUpload: File[] = [];
  loading = false;
  uploadsBaseURL = environment.uploadsBaseURL;


  constructor(private clubService: ClubService,
              private fb: FormBuilder,
              private mapsAPILoader: MapsAPILoader,
              private alertService: AlertService,
              private ngZone: NgZone,
              private storageService: StorageService,
              ) {

  }

  @ViewChild('address')
  public searchElementRef: ElementRef;

  ngOnInit() {
    this.createForm();
    this.id = JSON.parse(localStorage.getItem('currentUser'))._id;
    this.getClub(this.id);

    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: [ 'address' ]
      });

      autocomplete.addListener('place_changed', () => {

        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }


          // set latitude, longitude and zoom
          this.clubForm.get('address.lat').setValue(place.geometry.location.lat());
          this.clubForm.get('address.lng').setValue(place.geometry.location.lng());
          this.clubForm.get('address.address').setValue(place.formatted_address);
          console.log(this.clubForm.get('address').value);
          // this.registerClubForm.get('address.address').setValue(place.
        });
      });
    });

  }

  private initAddress() {

  }

  private getClub(id: string) {
    this.clubService.getById(id).subscribe(userClub => {

      this.club = userClub as any;
      this.clubForm.setValue({
        _id: this.club._id,
        name: this.club.name,
        description: this.club.description,
        phoneNumber: this.club.phoneNumber,
        address: this.club.address,
        services: this.club.services,
        profileImg: this.club.profileImg,
        galleryImg: this.club.galleryImg,
        socialMedia: this.club.socialMedia,
        mercadoPago: this.club.mercadoPago,
        dniMercadoPago: this.club.dniMercadoPago,
      });

      if (this.club.address.address) {
        console.log('entra al iff address addres');
        this.searchElementRef.nativeElement.value = this.club.address.address;

      }
      this.profileImage = [
        this.uploadsBaseURL + this.club.profileImg.replace(/ /g, '%20')
      ];
      console.log(this.club.galleryImg);
      const relativeGallery = [];
      this.club.galleryImg.forEach((item, index) => {
        const newItem = item.replace(/ /g, '%20');
        console.log(newItem);

        const relativePath =   this.uploadsBaseURL + newItem;
        relativeGallery.push(relativePath);
      });
      this.profileGallery = relativeGallery;
      console.log(this.profileGallery);
      console.log(this.profileImage);

    });
  }

  createForm() {
    this.clubForm = this.fb.group({
      _id: null,
      name: [ null, Validators.required ],
      description: [ null, Validators.compose([ Validators.required, Validators.maxLength(255) ]) ],
      phoneNumber: null,
      address: this.fb.group({
        lat: null,
        lng: null,
        address: null,
        shortAddress: null
      }),
      services: [ [], Validators.required ],
      profileImg: [ null, Validators.required ],
      galleryImg: null,
      socialMedia: this.fb.group({
        facebookId: null,
        twitterId: null,
        instagramId: null,
        googleId: null
      }),
      mercadoPago: null,
     dniMercadoPago: [ null, Validators.compose([ Validators.maxLength(8) ]) ],
    });
  }

  public profileUploaded(file: FileHolder) {
    this.filesToUpload = file.file;
    this.clubForm.controls[ 'profileImg' ].setValue(true);
  }

  public galleryUploaded(file: FileHolder) {
    console.log(file);
    this.galleryToUpload.push(file.file);
    console.log(this.galleryToUpload);
    this.clubForm.controls[ 'galleryImg' ].setValue(true);
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
      this.clubForm.controls[ 'galleryImg' ].setValue(null);
    }
  }

  public profileRemoved() {
    this.clubForm.controls[ 'profileImg' ].setValue(null);
    this.filesToUpload = null;
    console.log(this.clubForm.controls[ 'profileImg' ])
  }

  public requestAutocompleteItemsFake = (text: string): Observable<string[]> => {
    return of([
      'Asador', 'Buffet', 'Parking', 'Techado', 'Bar', 'Nocturno'
    ]);
  };

  public updateClubData() {
    if (this.clubForm.valid) {
      this.loading = true;
      let formData: any = new FormData();
      if (this.clubForm.get('profileImg').value == true) {
        const file: File = this.filesToUpload;
        formData.append('profile', file, file[ 'name' ]);

      }
      if (this.clubForm.get('galleryImg').value == true) {
        const gallery: File[] = this.galleryToUpload;
        for (let i = 0; i < gallery.length; i++) {
          formData.append('gallery', gallery[ i ], gallery[ i ].name);
        }
      }
      formData.append('body', JSON.stringify(this.clubForm.value));
      console.log(formData.get('body'));
      this.clubService.update(this.club._id, formData)
        .subscribe(
          data => {
            console.log(data);
            this.storageService.store('currentUser', data);
            this.alertService.success('Los datos se actualizaron correctamente', true);
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          });
    } else {
      ValidateAllFields.validateAllFields(this.clubForm);
    }
  }

}
