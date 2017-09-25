import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterClubComponent } from './register-club/index';
import { ProfileClubClientComponent } from './ClubProfileClient/clubProfileClient.component';
import { AuthGuard } from './_guards/index';
import {ResultComponent} from './result/index';

const appRoutes: Routes = [
      { path: '', component: HomeComponent },

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterClubComponent },
    { path: 'results/club/:id', component: ProfileClubClientComponent},
    {path: 'results', component: ResultComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);