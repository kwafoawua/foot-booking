/**
 * Created by pablo on 26/11/2017.
 */

import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {TournamentStageComponent} from "./tournament-stage/tournament-stage.component";
import {StageComponent} from "./stage/stage.component";

const profileClubRoutes: Routes = [
    {
        path: 'campeonato/administrar-fases',
        component:TournamentStageComponent,
        children: [
            {
                path: 'ronda',
                component: StageComponent,
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
export class TournamentModule { }