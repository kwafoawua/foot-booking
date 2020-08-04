import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainManagementComponent} from '../tournament-management/mainManagement.component';
import { TournamentStageComponent } from './tournament-stage/tournament-stage.component';
import { StageComponent } from './stage/stage.component';
import { TournamentDefinitionComponent } from './tournament-definition/tournament-definition.component';
import { GameFormArrayComponent } from './game/game-form-array.component';
import { GameComponent } from './game/game.component';

const profileClubRoutes: Routes = [
  {
    path: 'campeonato/administrar-fases',
    component: TournamentStageComponent,
    children: [
      {
        path: 'stage',
        component: StageComponent,
      },
      { path: 'nuevo-campeonato', component: TournamentDefinitionComponent },
      { path: 'campeonato/administrar-fases', component: TournamentStageComponent },

    ],
  },
  {
    path: 'campeonato/nuevo',
    component: TournamentDefinitionComponent
  },
  {path: 'campeonato/definicion/:id', component: TournamentDefinitionComponent },

];

@NgModule({
  imports: [
    RouterModule.forChild(profileClubRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class TournamentRoutingModule {
}
