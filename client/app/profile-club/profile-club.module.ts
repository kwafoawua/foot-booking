/**
 * Created by USUARIO on 16/10/2017.
 */
import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule, ReactiveFormsModule  }    from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { ImageUploadModule } from 'angular2-image-upload';
import { CustomFormsModule } from 'ng2-validation';
//API MAPS
import { AgmCoreModule } from '@agm/core';
import {DpDatePickerModule} from 'ng2-date-picker';

import { ProfileClubComponent, ProfileClubInfoComponent, ProfileClubPasswordComponent, ProfileClubUserComponent }    from './index';
import { ProfileClubRoutingModule } from './profile-club-routing.module';


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
            libraries: ["places"]
        }),
        DpDatePickerModule
    ],
    declarations: [
        ProfileClubUserComponent,
        ProfileClubPasswordComponent,
        ProfileClubInfoComponent,
        ProfileClubComponent
    ],
    providers: [  ]
})
export class ProfileClubModule {}