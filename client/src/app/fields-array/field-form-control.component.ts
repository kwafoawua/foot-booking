import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'field-control',
  templateUrl: 'field-form-control.component.html'
})
export class FieldFormControlComponent {

  public cantPlayerSelect: number[] = [5, 7, 11];
  public fieldTypeSelect: string[] = [ 'Cesped', 'Sintético', 'Tierra' ];

  @Input() public index: number;
  @Input() public field: FormGroup;
  @Output() public removed: EventEmitter<number> = new EventEmitter<number>();

  static buildField() {
    return new FormGroup({
      _id: new FormControl(''),
      fieldName: new FormControl('', Validators.required),
      cantPlayers: new FormControl('', Validators.required),
      fieldType: new FormControl('', Validators.required),
      services: new FormControl([], Validators.required),
      price: new FormControl('', Validators.required)
    });
  }

  public requestAutocompleteItemsFake = () => [ 'Techado', 'Marcador', 'Iluminación' ];

  onSelectCant(cant: number) {
  }

  onSelectType(type: string) {
  }

}
