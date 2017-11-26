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
import { ImageUploadModule } from 'angular2-image-upload';
import { CustomFormsModule } from 'ng2-validation';
//API MAPS
import { AgmCoreModule } from '@agm/core';
import {DpDatePickerModule} from 'ng2-date-picker';

import {GameComponent} from "./game/game.component";
import {StageComponent} from "./stage/stage.component";
import {TournamentStageComponent} from "./tournament-stage/tournament-stage.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TagInputModule,
        BrowserAnimationsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAAwaI8YafySsHraMA_9G_n30_FECUhoVs',
            libraries: ["places"]
        }),
        DpDatePickerModule
    ],
    declarations: [
        TournamentStageComponent,
        StageComponent,
        GameComponent
    ],
    providers: [  ]
})
export class TournamentModule {}