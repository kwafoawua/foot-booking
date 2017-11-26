import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {DpDatePickerModule, IDatePickerDirectiveConfig} from  'ng2-date-picker';
import {Moment} from "moment";
import {ITimeSelectConfig} from "ng2-date-picker/time-select/time-select-config.model";
import {TournamentService} from "../../_services/tournament.service";
import {UserService, ClubService} from "../../_services/index";
import {AlertService} from "../../_services/alert.service";

/**
 * Created by pablo on 25/11/2017.
 */


@Component({
    moduleId: module.id,
    templateUrl: 'tournament-definition.component.html',

})

export class TournamentDefinitionComponent implements OnInit {
    tournamentForm : FormGroup;
    idClub:any;
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
    club: Club;
    clubId : string = "";    

    constructor(private fb:FormBuilder, private tournamentService: TournamentService,
                private alertService: AlertService, private userService: UserService,
                private clubService: ClubService){
        this.createForm();

    }

    ngOnInit(){
        this.getClubId();
    }

    getClubId(){
        this.idClub = JSON.parse(localStorage.getItem('currentUser')).playerOrClubId;

    }

    createForm(){
        this.tournamentForm = this.fb.group({
            _idClub: this.idClub,
            name: [null, Validators.required],
            description: [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
            inicioInscripcion:[null, Validators.required],
            finInscripcion:[null, Validators.required],
            inicioCampeonato:[null, Validators.required],
            finCampeonato:[null],
            cantEquipos:[null,Validators.required],
            fee:[null,Validators.required]
        })
    }

    createTournament(){
        if(this.tournamentForm.valid){
            this.tournamentService.create(this.tournamentForm).subscribe(data=> {
                this.alertService.success("se guardaron los cambios",true),
                    console.log("el form", this.tournamentForm);

                },
                error => {
                    this.alertService.error("ha ocurrido un error",false);})
        }
    }

}