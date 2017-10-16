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

// Routes for child routing
import { ProfileEditComponent, ProfileInfoComponent } from './profile-player/options-component/index';
//import { ProfileEditComponent } from './profile-player/options-component/profile-edit.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },

    { path: 'login', component: LoginComponent },
    { path: 'results/club/:id', component: ProfileClubClientComponent},
    { path: 'player/register', component: RegisterPlayerComponent },

/*    { path: 'editPlayer', component: RegisterPlayerComponent,
        children: [
            { path: 'infoPlayer', component:ProfileInfoComponent, outlet:'profile-selection' },
            { path: 'editPlayer', component:ProfileEditComponent, outlet:'profile-selection' },
            { path: 'editPlayer', component:ProfileEditComponent, outlet:'profile-selection' }
        ]
    },
    { path: 'editPlayer', component: ProfileEditComponent, outlet:'profile-selection' },
*/
    { path: 'profile-player/:id', component: ProfilePlayerComponent, canActivate: [AuthGuard]},
    {path: 'results', component: ResultComponent },
    {path: 'club/register', component: RegisterClubComponent},
    {path: 'club/admin', component: AdminClubComponent, canActivate:[AuthGuard]},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);