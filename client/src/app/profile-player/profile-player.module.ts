import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { ImageUploadModule } from 'angular2-image-upload';
import { CustomFormsModule } from 'ng2-validation';

import {
  ProfilePlayerComponent,
  ProfilePlayerInfoComponent,
  ProfilePlayerEditComponent,
  ProfilePlayerConfigComponent
} from './index';
import { ProfilePlayerRoutingModule } from './profile-player-routing.module';
import { DpDatePickerModule } from 'ng2-date-picker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProfilePlayerRoutingModule,
    ReactiveFormsModule,
    TagInputModule,
    // BrowserAnimationsModule,
    ImageUploadModule.forRoot(),
    CustomFormsModule,
    DpDatePickerModule
  ],
  declarations: [
    ProfilePlayerComponent,
    ProfilePlayerInfoComponent,
    ProfilePlayerEditComponent,
    ProfilePlayerConfigComponent
  ],
  providers: []
})

export class ProfilePlayerModule {
}
