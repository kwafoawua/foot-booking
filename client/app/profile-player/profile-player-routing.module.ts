import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfilePlayerComponent, ProfilePlayerInfoComponent,
    ProfilePlayerEditComponent, ProfilePlayerConfigComponent } from './index';

const profilePlayerRoutes: Routes = [
    {
        path: 'profile-player/:_id',
        component: ProfilePlayerComponent,
        children: [
            {
                path: '',
                component: ProfilePlayerInfoComponent,
            },
            {
                path: 'edit',
                component: ProfilePlayerEditComponent
            },
            {
                path: 'config',
                component: ProfilePlayerConfigComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(profilePlayerRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class ProfilePlayerRoutingModule {}