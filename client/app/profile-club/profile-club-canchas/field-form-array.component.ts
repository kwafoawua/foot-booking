/**
 * Created by USUARIO on 26/09/2017.
 */
import {Component, EventEmitter, Input, Output} from '@angular/core';
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

    @Output()
    public deletedFields: EventEmitter<any> = new EventEmitter<any>();

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

    removeField(event) {
        console.log(this.fieldFormArray.value[event]);
        if(this.fieldFormArray.value[event]._id !== '') {
            let delFields = [];
            console.log(this.fieldFormArray.value[event]._id);
            delFields.push(this.fieldFormArray.value[event]._id);
            this.deletedFields.emit(delFields);
            this.fieldFormArray.removeAt(event);

        }
       // this.fieldFormArray.removeAt(event);
    }


}


