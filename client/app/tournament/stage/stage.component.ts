import {Component, OnInit} from "@angular/core";
import {ITimeSelectConfig} from "ng2-date-picker/time-select/time-select-config.model";
import {IDatePickerDirectiveConfig} from "ng2-date-picker";
import {Moment} from "moment";
import {FormGroup} from "@angular/forms";
/**
 * Created by pablo on 25/11/2017.
 */

@Component({
    selector: 'stage',
    moduleId: module.id,
    templateUrl: 'stage.component.html'
})

export class StageComponent implements OnInit {

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

    ngOnInit(){}



}