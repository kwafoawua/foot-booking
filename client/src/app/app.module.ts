import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ImageUploadModule } from 'angular2-image-upload';
import { CustomFormsModule } from 'ng2-validation';
import { DemoUtilsModule } from './_helpers/demo-utils/module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { authInterceptorProviders } from './_helpers/index';
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import {
  AlertService,
  AuthService,
  UserService,
  ClubService,
  PlayerService,
  CommentService
} from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterClubComponent } from './register-club/index';
import { SiteHeaderComponent } from './site-header/site-header.component';
import { SiteFooterComponent } from './site-footer/site-footer.component';
import { ProfileClubClientComponent } from './ClubProfileClient/clubProfileClient.component';
import { ResultComponent } from './result/index';
import { SearchService } from './_services/search.service';
import { BookingService } from './_services/booking.service';
import { RegisterPlayerComponent } from './register-player/index';
import { AdminClubComponent } from './admin-club/index';
import { ProfileClubModule } from './profile-club/profile-club.module';
import { ProfilePlayerModule } from './profile-player/profile-player.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FieldsManagementComponent } from './fields-management/index';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { bookingPlayerComponent } from './booking-player/booking-player.component';
import { EstadisticasClubComponent } from './estadisticas-club/index';
import { commentsComponent } from './_directives/Comments/commentsComponent';

// API MAPS
import { AgmCoreModule } from '@agm/core';
import { DpDatePickerModule } from 'ng2-date-picker';
import { ConfirmationComponent } from './booking-confirmation/confirmation.component';
import { TournamentDefinitionComponent } from './tournament/tournament-definition/tournament-definition.component';
import { TournamentService } from './_services/tournament.service';
import { TournamentStageComponent } from './tournament/tournament-stage/tournament-stage.component';
import { StageComponent } from './tournament/stage/stage.component';
import { GameComponent } from './tournament/game/game.component';
import { TournamentModule } from './tournament/tournament.module';
import { LoginGuard } from './_guards/login.guard';
import {ResultadoBusquedaComponent} from './result/resultadoBusqueda.component';
import { StorageService } from './_services/storage.service';
import { FieldsArrayModule } from './fields-array/fields-array.module';
import { CardComponent } from './common/card/card.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    ReactiveFormsModule,
    TagInputModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    ImageUploadModule.forRoot(),
    CustomFormsModule,
    DpDatePickerModule,
    AgmCoreModule.forRoot({// old: AIzaSyAAwaI8YafySsHraMA_9G_n30_FECUhoVs
      apiKey: 'AIzaSyBuNW_HnnPaMrMq8KGEhiEzUnbVOO_OJzA',
      libraries: [ 'places' ]
    }),
    ProfileClubModule,
    ProfilePlayerModule,
    FieldsArrayModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgbModule.forRoot(),
    DemoUtilsModule,
    TournamentModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
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
    AdminClubComponent,
    ConfirmationComponent,
    FieldsManagementComponent,
    EstadisticasClubComponent,
    bookingPlayerComponent,
    commentsComponent,
    ResultadoBusquedaComponent,
    CardComponent
  ],
  providers: [
    authInterceptorProviders,
    AuthGuard,
    StorageService,
    LoginGuard,
    AlertService,
    AuthService,
    UserService,
    ClubService,
    PlayerService,
    SearchService,
    BookingService,
    CommentService,
    TournamentService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {}
