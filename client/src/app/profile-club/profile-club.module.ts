import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
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
  ProfileClubUserComponent,
  ClubLinkMpComponent
} from './index';
import { ProfileClubRoutingModule } from './profile-club-routing.module';
import { FieldsArrayModule } from '../fields-array/fields-array.module';
import {AlertService} from "../_services";
import {MaterialModule} from "../material.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ProfileClubRoutingModule,
        ReactiveFormsModule,
        TagInputModule,
        ImageUploadModule.forRoot(),
        CustomFormsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyB4OTv481RhKhcMM8NP10PxO_6HbJPney8',
            libraries: ['places']
        }),
        DpDatePickerModule,
        FieldsArrayModule,
        MaterialModule
    ],
  declarations: [
    ProfileClubUserComponent,
    ProfileClubPasswordComponent,
    ProfileClubInfoComponent,
    ProfileClubComponent,
    ProfileClubCanchasComponent,
    ClubLinkMpComponent
  ],
  providers: [
    AlertService,
  ]
})
export class ProfileClubModule {
}
