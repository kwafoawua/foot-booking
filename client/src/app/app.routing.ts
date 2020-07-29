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
import { AdminClubComponent } from './admin-club/index';
import { bookingPlayerComponent } from './booking-player/booking-player.component';
import { EstadisticasClubComponent } from './estadisticas-club/index';
import {MainManagementComponent} from './tournament-management/mainManagement.component';
import {ClubInfoComponent} from './ClubProfileClient/clubInfo.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'login', component: LoginComponent, canActivate: [ LoginGuard ] },
  { path: 'results/club/:id', component: ClubInfoComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: 'player/register', component: RegisterPlayerComponent },
  { path: 'profile-player/:id', component: ProfilePlayerComponent, canActivate: [ AuthGuard ] },
  { path: 'results', component: ResultComponent },
  { path: 'club/register', component: RegisterClubComponent },
  { path: 'club/admin', component: AdminClubComponent, canActivate: [ AuthGuard ] },
  { path: 'club/estadisticas', component: EstadisticasClubComponent },
  // { path: 'club/gestion-canchas', component: FieldsManagementComponent },
  { path: 'player/mis-reservas', component: bookingPlayerComponent },
  { path: 'campeonatos/administrar', component: MainManagementComponent},
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
