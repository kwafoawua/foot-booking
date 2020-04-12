/**
 * Created by USUARIO on 26/09/2017.
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FieldFormControlComponent } from './field-form-control.component';

@Component({
  selector: 'fields-array',
  templateUrl: 'field-form-array.component.html'
})
export class FieldFormArrayComponent {

  @Input()
  public fieldFormArray: FormArray;

  @Output()
  public deletedFields: EventEmitter<any> = new EventEmitter<any>();

  addFields() {
    this.fieldFormArray.push(FieldFormControlComponent.buildField())
  }

  static initFields(cantFields: number) {
    let fieldArray: any = [];
    for (let i = 0; i < cantFields; i++) {
      fieldArray.push(FieldFormControlComponent.buildField());
    }
    return new FormArray(fieldArray);
  }

  removeField(event) {
    if (this.fieldFormArray.value[ event ]._id !== '') {
      console.log(this.fieldFormArray.value[ event ]._id);
      this.deletedFields.emit(this.fieldFormArray.value[ event ]._id);
      this.fieldFormArray.removeAt(event);

    } else {
      console.log(this.fieldFormArray.value[ event ]);
      this.fieldFormArray.removeAt(event);
    }
  }


}

