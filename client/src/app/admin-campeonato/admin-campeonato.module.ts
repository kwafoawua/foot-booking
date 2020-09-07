import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { AdminCampeonatoComponent } from './admin-campeonato.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomFormsModule } from 'ng2-validation';
import { DefinicionComponent } from './definicion/definicion.component';
import { RouterModule } from '@angular/router';
import { DetalleCampeonatoComponent } from './detalle-campeonato/detalle-campeonato.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CustomFormsModule,
    RouterModule,
  ],
  exports: [],
  declarations: [
    AdminCampeonatoComponent,
    DefinicionComponent,
    DetalleCampeonatoComponent
  ]
})
export class AdminCampeonatoModule { }
