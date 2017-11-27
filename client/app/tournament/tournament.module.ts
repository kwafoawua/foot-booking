/**
 * Created by pablo on 26/11/2017.
 */
/**
 * Created by USUARIO on 16/10/2017.
 */
import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule, ReactiveFormsModule  }    from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!

import {DpDatePickerModule} from 'ng2-date-picker';

import {GameComponent} from "./game/game.component";
import {StageComponent} from "./stage/stage.component";
import {TournamentStageComponent} from "./tournament-stage/tournament-stage.component";
import {GameFormArrayComponent} from "./game/game-form-array.component";
import {TournamentRoutingModule} from "./tournament-routing.module";
import {TournamentDefinitionComponent} from "./tournament-definition/tournament-definition.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TournamentRoutingModule,
        ReactiveFormsModule,
        TagInputModule,
        BrowserAnimationsModule,
        DpDatePickerModule
    ],
    declarations: [
        TournamentStageComponent,
        StageComponent,
        GameComponent,
        GameFormArrayComponent,
        TournamentDefinitionComponent,

    ],
    providers: [  ]
})
export class TournamentModule {}