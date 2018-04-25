/**
 * Created by USUARIO on 26/09/2017.
 */
import {Component, Input} from '@angular/core';
import { FormArray } from '@angular/forms';
import {FieldFormControlComponent} from "./field-form-control.component";

@Component({
    moduleId: module.id,
    selector: 'fields-array',
    templateUrl: 'field-form-array.component.html'
})
export class FieldFormArrayComponent {

    @Input()
    public fieldFormArray: FormArray;

    addFields() {
        this.fieldFormArray.push(FieldFormControlComponent.buildField())
    }

    static initFields(cantFields: number) {
        let fieldArray : any = [];
        for(let i = 0; i < cantFields; i++){
            fieldArray.push(FieldFormControlComponent.buildField());
        }
        return new FormArray(fieldArray);
    }
}
