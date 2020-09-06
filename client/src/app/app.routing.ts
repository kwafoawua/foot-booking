import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterClubComponent } from './register-club/index';
import { ProfileClubClientComponent } from './ClubProfileClient/clubProfileClient.component';
import { RegisterPlayerComponent } from './register-player/index';
import { ProfilePlayerComponent } from './profile-player/index';
import { AuthGuard, LoginGuard } from './_guards/index';
import { ConfirmationComponent } from './booking-confirmation/confirmation.component';
import { ResultComponent } from './result/index';
import { bookingPlayerComponent } from './booking-player/booking-player.component';
import { EstadisticasClubComponent } from './estadisticas-club/index';
import {MainManagementComponent} from './tournament-management/mainManagement.component';
import {ClubInfoComponent} from './ClubProfileClient/clubInfo.component';

import {CampeonatoInfoComponent} from './ClubProfileClient/CampeonatoInfo.component';


import { FieldsManagementComponent } from './fields-management';
import { AdminCampeonatoComponent } from './admin-campeonato/admin-campeonato.component';
import { DefinicionComponent } from './admin-campeonato/definicion/definicion.component';
import { DetalleCampeonatoComponent } from './admin-campeonato/detalle-campeonato/detalle-campeonato.component';
import {SiteLayoutComponent} from './_layout/site-layout/site-layout.component';
import {AdminLayoutComponent} from './_layout/admin-layout/admin-layout.component';

const appRoutes: Routes = [
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent, canActivate: [ LoginGuard ] },
      { path: 'results/club/:id', component: ClubInfoComponent },
      { path: 'confirmation', component: ConfirmationComponent },
      { path: 'player/register', component: RegisterPlayerComponent },
      { path: 'profile-player/:id', component: ProfilePlayerComponent, canActivate: [ AuthGuard ] },
      { path: 'results', component: ResultComponent },
      { path: 'club/register', component: RegisterClubComponent },
      { path: 'player/mis-reservas', component: bookingPlayerComponent },
      { path: 'campeonatos/administrar', component: MainManagementComponent},
      {path: 'campeonato/:id', component: CampeonatoInfoComponent}
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'admin', component: EstadisticasClubComponent },
      { path: 'admin/dashboard', component: EstadisticasClubComponent },
      { path: 'admin/reservas', component: FieldsManagementComponent },
      { path: 'admin/campeonato', component: AdminCampeonatoComponent },
      { path: 'admin/campeonato/nuevo', component: DefinicionComponent },
      { path: 'admin/campeonato/:id', component: DetalleCampeonatoComponent },
    ],
  },
  { path: '**', redirectTo: '' }

];

export const routing = RouterModule.forRoot(appRoutes);
