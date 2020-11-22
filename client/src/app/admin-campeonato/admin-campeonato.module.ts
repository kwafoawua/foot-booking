import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { AdminCampeonatoComponent } from './admin-campeonato.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CustomFormsModule } from 'ng2-validation';
import { DefinicionComponent } from './definicion/definicion.component';
import { RouterModule } from '@angular/router';
import { DetalleCampeonatoComponent } from './detalle-campeonato/detalle-campeonato.component';
import { FixtureComponent } from './fixture/fixture.component';
import { MatchComponent, MatchUpdateDialogComponent } from './fixture/match/match.component';
import { NgTournamentTreeModule } from 'ng-tournament-tree';
import { ListaInscripcionComponent } from './lista-inscripcion/lista-inscripcion.component';
import { SharedModule } from '../shared.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CustomFormsModule,
    RouterModule,
    NgTournamentTreeModule,
    SharedModule,
  ],
    exports: [
      FixtureComponent,
      MatchComponent,
      MatchUpdateDialogComponent,
    ],
  declarations: [
    AdminCampeonatoComponent,
    DefinicionComponent,
    DetalleCampeonatoComponent,
    FixtureComponent,
    MatchComponent,
    MatchUpdateDialogComponent,
    ListaInscripcionComponent
  ],
  entryComponents: [
    MatchUpdateDialogComponent,
  ]
})
export class AdminCampeonatoModule { }
