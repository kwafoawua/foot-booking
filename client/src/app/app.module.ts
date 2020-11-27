import { registerLocaleData } from '@angular/common';

import { LOCALE_ID, NgModule } from '@angular/core';
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
import { MaterialModule } from './material.module';
import { NgTournamentTreeModule } from 'ng-tournament-tree';
import localeEsAr from '@angular/common/locales/es-AR';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { authInterceptorProviders } from './_helpers/index';
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthService, ClubService, CommentService, PlayerService, UserService, PaginationService } from './_services/index';
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
import { ProfileClubModule } from './profile-club/profile-club.module';
import { ProfilePlayerModule } from './profile-player/profile-player.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FieldsManagementComponent } from './fields-management/index';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BookingPlayerComponent } from './booking-player/booking-player.component';
import { EstadisticasClubComponent } from './estadisticas-club/index';
import { CommentsComponent } from './Comments/commentsComponent';
import { ClubInfoComponent } from './ClubProfileClient/clubInfo.component';
import { CampeonatoInfoComponent } from './ClubProfileClient/CampeonatoInfo.component';
import { CampeonatoInscripcionComponent } from './ClubProfileClient/CampeonatoInscripcion.component';
import { InfoFixtureComponent } from './ClubProfileClient/infoFixture.component';
// API MAPS
import { AgmCoreModule } from '@agm/core';
import { DpDatePickerModule } from 'ng2-date-picker';
import {
  CancelPreReservaComponent,
  ConfirmationComponent
} from './booking-confirmation/confirmation.component';
import { TournamentService } from './_services/tournament.service';
import { LoginGuard } from './_guards/login.guard';
import { ResultadoBusquedaComponent } from './result/resultadoBusqueda.component';
import { TorneosPlayerComponent } from './booking-player/torneos-player-component';

import { StorageService } from './_services/storage.service';
import { FieldsArrayModule } from './fields-array/fields-array.module';
import { CardComponent } from './common/card/card.component';
import { DestacadosComponent } from './home/destacados/destacados.component';
import { InputTextComponent } from './common/input-text/input-text.component';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { AdminLayoutComponent } from './_layout/admin-layout/admin-layout.component';
import { AdminCampeonatoModule } from './admin-campeonato/admin-campeonato.module';
import { SharedModule } from './shared.module';
import {MercadoPagoService} from './_services/mercado-pago.service';
import { NgxPaginationModule } from 'ngx-pagination';
import {TerminosCondiciones} from './common/terminos-condiciones/terminos-condiciones';
import {MatchUpdateDialogComponent} from "./admin-campeonato/fixture/match/match.component";
import {CancelTorneoDialogComponent} from "./admin-campeonato/admin-campeonato.component";

registerLocaleData(localeEsAr, 'es-AR');
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
      apiKey: 'AIzaSyB4OTv481RhKhcMM8NP10PxO_6HbJPney8',
      libraries: [ 'places' ]
    }),
    ProfileClubModule,
    ProfilePlayerModule,
    FieldsArrayModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgbModule,
    DemoUtilsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    MaterialModule,
    AdminCampeonatoModule,
    NgTournamentTreeModule,
    SharedModule,
    NgxPaginationModule,
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
    ConfirmationComponent,
    FieldsManagementComponent,
    EstadisticasClubComponent,
    BookingPlayerComponent,
    CommentsComponent,
    ResultadoBusquedaComponent,
    CardComponent,
    DestacadosComponent,
    InputTextComponent,
    ClubInfoComponent,
    CampeonatoInfoComponent,
    SiteLayoutComponent,
    AdminLayoutComponent,
    CampeonatoInscripcionComponent,
    InfoFixtureComponent,
    TorneosPlayerComponent,
    TerminosCondiciones,
    CancelPreReservaComponent,
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
    TournamentService,
    MercadoPagoService,
    PaginationService,
    { provide: LOCALE_ID, useValue: 'es-AR' },
  ],
  entryComponents: [
    CancelPreReservaComponent
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {}
