import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldFormArrayComponent } from './field-form-array.component';
import { FieldFormControlComponent } from './field-form-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomFormsModule } from 'ng2-validation';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
    BrowserAnimationsModule,
    CustomFormsModule,
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
