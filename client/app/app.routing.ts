import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterClubComponent } from './register-club/index';
import { ProfileClubClientComponent } from './ClubProfileClient/clubProfileClient.component';
import { RegisterPlayerComponent } from './register-player/index';
import { ProfilePlayerComponent } from './profile-player/index';
import { AuthGuard } from './_guards/index';
import {ResultComponent} from './result/index';
import {AdminClubComponent} from "./admin-club/index";
import {confirmationComponent} from './booking-confirmation/confirmation.component';

// Routes for child routing
import { ProfileEditComponent } from './profile-player/options-component/profile-edit.component';
import { ProfileInfoComponent } from './profile-player/options-component/profile-info.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },

    { path: 'login', component: LoginComponent },
    { path: 'results/club/:id', component: ProfileClubClientComponent},
    {path: 'confirmation', component:confirmationComponent},
    { path: 'player/register', component: RegisterPlayerComponent },

    { path: 'editPlayer', component: RegisterPlayerComponent},//preguntarle a colo
    { path: 'profile-player/:id', component: ProfilePlayerComponent, canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'infoPlayer', pathMatch: 'full' },
            { path: 'infoPlayer', component: ProfileInfoComponent },
            { path: 'editPlayer', component: ProfileEditComponent }
        ]
    },
    {path: 'results', component: ResultComponent },
    {path: 'club/register', component: RegisterClubComponent},
    {path: 'club/admin', component: AdminClubComponent, canActivate:[AuthGuard]},


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);