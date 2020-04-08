import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Field } from '../../_models/field';

/**
 * Created by USUARIO on 26/09/2017.
 */
@Component({
  moduleId: module.id,
  selector: 'field-control',
  templateUrl: 'field-form-control.component.html'
})
export class FieldFormControlComponent {

  public fields: Field[];
  public cantPlayerSelect: any[] = [ { cant: 5, desc: '5 Jugadores' }, { cant: 7, desc: '7 Jugadores' }, {
    cant: 11,
    desc: '11 Jugadores'
  } ];
  public fieldTypeSelect: string[] = [ 'Cesped', 'Sintético', 'Tierra' ];

  @Input()
  public index: number;

  @Input()
  public field: FormGroup;

  @Output()
  public removed: EventEmitter<number> = new EventEmitter<number>();

  static buildField() {
    return new FormGroup({
      _id: new FormControl(''),
      fieldName: new FormControl(''),
      cantPlayers: new FormControl(''),
      fieldType: new FormControl(''),
      services: new FormControl([]),
      price: new FormControl('')

    });
  }

  public requestAutocompleteItemsFake = (text: string): Observable<string[]> => {
    return of([
      'Techado', 'Marcador', 'Iluminación'
    ]);
  };

  onSelectCant(cant: number) {
  }

  onSelectType(type: string) {
  }

}
