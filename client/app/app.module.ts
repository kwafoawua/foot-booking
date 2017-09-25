import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';



import { AppComponent } from './app.component';
import { routing } from './app.routing';



import { customHttpProvider } from './_helpers/index';
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, ClubService, PlayerService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterClubComponent } from './register-club/index';
import { RegisterPlayerComponent } from './register-player/index';

import { SiteHeaderComponent } from './site-header/site-header.component';
import { SiteFooterComponent } from './site-footer/site-footer.component';
import { ProfileComponent } from './profile/index';
import { ProfilePlayerComponent } from './profile-player/index';
import { ResultComponent } from './result/index';
import { SearchService } from "./_services/search.service";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
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
        ProfileComponent,
        ProfilePlayerComponent,
        ResultComponent
    ],
    providers: [
        customHttpProvider,
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        ClubService,
        PlayerService,
        SearchService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }