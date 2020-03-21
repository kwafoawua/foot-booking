import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { ImageUploadModule } from 'angular2-image-upload';
import { CustomFormsModule } from 'ng2-validation';
//API MAPS
import { AgmCoreModule } from '@agm/core';
import { DpDatePickerModule } from 'ng2-date-picker';

import {
  ProfileClubComponent,
  ProfileClubCanchasComponent,
  ProfileClubInfoComponent,
  ProfileClubPasswordComponent,
  ProfileClubUserComponent
} from './index';
import { ProfileClubRoutingModule } from './profile-club-routing.module';
import { FieldFormControlComponent } from './profile-club-canchas/field-form-control.component';
import { FieldFormArrayComponent } from './profile-club-canchas/field-form-array.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProfileClubRoutingModule,
    ReactiveFormsModule,
    TagInputModule,
    BrowserAnimationsModule,
    ImageUploadModule.forRoot(),
    CustomFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAAwaI8YafySsHraMA_9G_n30_FECUhoVs',
      libraries: [ 'places' ]
    }),
    DpDatePickerModule
  ],
  declarations: [
    ProfileClubUserComponent,
    ProfileClubPasswordComponent,
    ProfileClubInfoComponent,
    ProfileClubComponent,
    ProfileClubCanchasComponent,
    FieldFormArrayComponent,
    FieldFormControlComponent,
  ],
  providers: []
})
export class ProfileClubModule {
}
