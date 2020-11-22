import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WinnerCardCampeonatoComponent } from './winner-card-campeonato/winner-card-campeonato.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    WinnerCardCampeonatoComponent
  ],
  exports: [
    WinnerCardCampeonatoComponent
  ]
})
export class SharedModule { }
