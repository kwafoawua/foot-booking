import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterClubComponent } from './register-club/index';
import { ProfileClubClientComponent } from './ClubProfileClient/clubProfileClient.component';
import { RegisterPlayerComponent } from './register-player/index';
import { ProfilePlayerComponent } from './profile-player/index';
import { AuthGuard, LoginGuard } from './_guards/index';
import { confirmationComponent } from './booking-confirmation/confirmation.component';
import { ResultComponent } from './result/index';
import { AdminClubComponent } from './admin-club/index';
import { bookingPlayerComponent } from './booking-player/booking-player.component';

// Routes for child routing
import { FieldsManagementComponent } from './fields-management/index';
import { EstadisticasClubComponent } from './estadisticas-club/index';
import { TournamentDefinitionComponent } from './tournament/tournament-definition/tournament-definition.component';
import { TournamentStageComponent } from './tournament/tournament-stage/tournament-stage.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'login', component: LoginComponent, canActivate: [ LoginGuard ] },
  { path: 'results/club/:id', component: ProfileClubClientComponent },
  { path: 'confirmation', component: confirmationComponent },
  { path: 'player/register', component: RegisterPlayerComponent },
  { path: 'profile-player/:id', component: ProfilePlayerComponent, canActivate: [ AuthGuard ] },
  { path: 'results', component: ResultComponent },
  { path: 'club/register', component: RegisterClubComponent },
  { path: 'club/admin', component: AdminClubComponent, canActivate: [ AuthGuard ] },
  { path: 'club/estadisticas', component: EstadisticasClubComponent },
  { path: 'club/gestion-canchas', component: FieldsManagementComponent },
  { path: 'player/mis-reservas', component: bookingPlayerComponent },
  { path: 'nuevo-campeonato', component: TournamentDefinitionComponent },
  { path: 'campeonato/administrar-fases', component: TournamentStageComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
