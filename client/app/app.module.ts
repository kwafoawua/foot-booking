import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { ImageUploadModule } from 'angular2-image-upload';
import { CustomFormsModule } from 'ng2-validation';


import { AppComponent } from './app.component';
import { routing } from './app.routing';


import { customHttpProvider } from './_helpers/index';
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, ClubService, PlayerService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterClubComponent, FieldFormArrayComponent, FieldFormControlComponent } from './register-club/index';
import { SiteHeaderComponent } from './site-header/site-header.component';
import { SiteFooterComponent } from './site-footer/site-footer.component';
import { ProfileClubClientComponent } from './ClubProfileClient/clubProfileClient.component';
import {ResultComponent} from './result/index';
import {SearchService} from "./_services/search.service";
import { RegisterPlayerComponent } from './register-player/index';
import { ProfilePlayerComponent } from './profile-player/index';
import {AdminClubComponent} from "./admin-club/index";


// Module for child routing
import { ProfileInfoComponent } from './profile-player/options-component/profile-info.component';
import { ProfileEditComponent } from './profile-player/options-component/profile-edit.component';

//API MAPS
import { AgmCoreModule } from '@agm/core';
import {DpDatePickerModule} from 'ng2-date-picker';
import {confirmationComponent} from "./booking-confirmation/confirmation.component";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        ReactiveFormsModule,
        TagInputModule,
        BrowserAnimationsModule,
        ImageUploadModule.forRoot(),
        CustomFormsModule,
        DpDatePickerModule,

        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAAwaI8YafySsHraMA_9G_n30_FECUhoVs',
            libraries: ["places"]
        })
        ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterClubComponent,
        RegisterPlayerComponent,
        SiteHeaderComponent,
        SiteFooterComponent,
        ProfileClubClientComponent,
        ResultComponent,
        FieldFormArrayComponent,
        FieldFormControlComponent,
        ProfilePlayerComponent,
        AdminClubComponent,
        ProfileEditComponent,
        ProfileInfoComponent,
        confirmationComponent,


    ],
    providers: [
        customHttpProvider,
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        ClubService,
        PlayerService,
        SearchService,

    ],
    bootstrap: [AppComponent]
})

export class AppModule { }