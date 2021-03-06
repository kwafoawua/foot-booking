import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldFormArrayComponent } from './field-form-array.component';
import { FieldFormControlComponent } from './field-form-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { CustomFormsModule } from 'ng2-validation';
import { MaterialModule } from '../material.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
    CustomFormsModule,
    MaterialModule,
  ],
  declarations: [
    FieldFormArrayComponent,
    FieldFormControlComponent
  ],
  exports: [
    FieldFormArrayComponent,
    FieldFormControlComponent,
  ],
})
export class FieldsArrayModule { }
