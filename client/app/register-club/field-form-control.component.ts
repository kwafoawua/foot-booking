import {Component, EventEmitter, Input, Output} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";
/*ng-chhips*/
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/first';
/**
 * Created by USUARIO on 26/09/2017.
 */
@Component({
    moduleId: module.id,
    selector: 'field-control',
    templateUrl:'field-form-control.component.html'
})
export class FieldFormControlComponent {

    public cantPlayerSelect: any[] = [{cant: 5, desc: '5 Jugadores'},{cant:7, desc: '7 Jugadores'},{cant:11, desc: '11 Jugadores'}];
    public fieldTypeSelect: string[] = ['Cesped', 'Sintético', 'Tierra'];

    @Input()
    public index: number;

    @Input()
    public field: FormGroup;

    @Output()
    public removed: EventEmitter<number> = new EventEmitter<number>();

    static buildField() {
        return new FormGroup({
            fieldName: new FormControl(''),
            cantPlayers: new FormControl(''),
            services: new FormControl([]),
            fieldType: new FormControl('')
        });
    }

    public requestAutocompleteItemsFake = (text: string): Observable<string[]> => {
        return Observable.of([
            'Asador', 'Buffet', 'Parking', 'Techado', 'Bar', 'Nocturno'
        ]);
    };

    onSelectCant(cant: number) {}
    onSelectType(type: string) {}

}
