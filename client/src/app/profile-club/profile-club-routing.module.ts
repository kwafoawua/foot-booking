import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ProfileClubComponent,
  ProfileClubCanchasComponent,
  ProfileClubUserComponent,
  ProfileClubPasswordComponent,
  ProfileClubInfoComponent
} from './index';

const profileClubRoutes: Routes = [
  {
    path: 'profile-club/:id',
    component: ProfileClubComponent,
    children: [
      {
        path: '',
        component: ProfileClubInfoComponent
      },
      {
        path: 'password',
        component: ProfileClubPasswordComponent
      },

      {
        path: 'canchas',
        component: ProfileClubCanchasComponent
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
export class ProfileClubRoutingModule {}
