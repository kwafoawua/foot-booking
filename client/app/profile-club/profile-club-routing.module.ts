/**
 * Created by USUARIO on 16/10/2017.
 */
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileClubComponent, ProfileClubUserComponent, ProfileClubPasswordComponent, ProfileClubInfoComponent }     from './index';

const profileClubRoutes: Routes = [
    {
        path: 'club/profile',
        component: ProfileClubComponent,
        children: [
            {
                path: '',
                component: ProfileClubUserComponent,
            },
            {
                path: 'password',
                component: ProfileClubPasswordComponent
            },
            {
                path: 'info',
                component: ProfileClubInfoComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(profileClubRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ProfileClubRoutingModule { }