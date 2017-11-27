import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Moment} from "moment";
import {IDatePickerDirectiveConfig} from "ng2-date-picker";
import {ITimeSelectConfig} from "ng2-date-picker/time-select/time-select-config.model";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
/**
 * Created by pablo on 25/11/2017.
 */

@Component({

    selector:'game',
    moduleId: module.id,
    templateUrl: 'game.component.html',

})


export class GameComponent implements OnInit{
    @Input()
    public index: number;

    @Input()
    public game: FormGroup;

    @Output()
    public removed: EventEmitter<number> = new EventEmitter<number>();

    private form: FormGroup;
    selectedDate:any;
    selectedTime: any;
    configTime : ITimeSelectConfig = {
        minutesInterval: 60,
        minutesFormat: '00'
    };
    config: IDatePickerDirectiveConfig = {
        format: 'DD/MM/YYYY',
        enableMonthSelector: true,
        showNearMonthDays: false ,
        monthFormatter: (m: Moment): string => {
            return [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun',
                    'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ][m.month()] +
                ', ' + m.year();
        },
        appendTo: 'body'};



    ngOnInit(){    }




    static buildField() {
        return new FormGroup({
            equipo1: new FormControl(''),
            equipo2: new FormControl(''),
            field: new FormControl(''),
            time: new FormControl([]),
            price: new FormControl('')

        });
    }


    onSelectCant(cant: number) {}
    onSelectType(type: string) {}








}
