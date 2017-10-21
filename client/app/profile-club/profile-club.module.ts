/**
 * Created by USUARIO on 16/10/2017.
 */
import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule, ReactiveFormsModule  }    from '@angular/forms';

import { ProfileClubComponent, ProfileClubInfoComponent, ProfileClubPasswordComponent, ProfileClubUserComponent }    from './index';
import { ProfileClubRoutingModule } from './profile-club-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ProfileClubRoutingModule,
        ReactiveFormsModule
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