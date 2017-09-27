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
import { AlertService, AuthenticationService, UserService, ClubService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterClubComponent, FieldFormArrayComponent, FieldFormControlComponent } from './register-club/index';
//import { FormGroup, FormArray, FormBuilder,
    //Validators,ReactiveFormsModule  } from '@angular/forms';
import { SiteHeaderComponent } from './site-header/site-header.component';
import { SiteFooterComponent } from './site-footer/site-footer.component';
import { ProfileClubClientComponent } from './ClubProfileClient/clubProfileClient.component';
import {ResultComponent} from './result/index';
import {SearchService} from "./_services/search.service";


//API MAPS
import { AgmCoreModule } from '@agm/core';


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
        SiteHeaderComponent,
        SiteFooterComponent,
        ProfileClubClientComponent,
        ResultComponent,
        FieldFormArrayComponent,
        FieldFormControlComponent
    ],
    providers: [
        customHttpProvider,
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        ClubService,
        SearchService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }