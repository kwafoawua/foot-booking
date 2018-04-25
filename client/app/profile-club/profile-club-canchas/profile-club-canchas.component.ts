import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AlertService} from "../../_services/alert.service";
import {ClubService} from "../../_services/club.service";
import {Router} from "@angular/router";
import {UserService} from "../../_services/user.service";
import {FieldFormArrayComponent} from "./field-form-array.component";
import { ValidateAllFields } from '../../_helpers/index';
import {forEach} from "@angular/router/src/utils/collection";

/**
 * Created by pablo on 6/11/2017.
 */
@Component({
    moduleId: module.id,
    templateUrl: 'profile-club-canchas.component.html'
})

export class ProfileClubCanchasComponent implements OnInit{

    fieldClubForm:  FormGroup;
    user: any = {};
    club: any = {};
    username: string;
    loading: false;
    fields: any = [];

    constructor(
        private router: Router,
        private clubService: ClubService,
        private alertService: AlertService,
        private fb: FormBuilder,
        private userService: UserService) {}


    ngOnInit(){
        this.createForm(1);
        this.username = JSON.parse(localStorage.getItem('currentUser')).username;
        this.getClub(this.username);
    }

    createForm(cantFields: number) {
        this.fieldClubForm = this.fb.group({
            fields: FieldFormArrayComponent.initFields(cantFields)
        });
        console.log(this.fieldClubForm);
    }

    private getClub (username: string) {
        this.userService.getByUsername(username).subscribe(userClub => {

            this.club = userClub.creator;
            console.log(this.club);
            this.createForm(this.club.fields.length);
            this.fieldClubForm.patchValue({
                fields: this.club.fields
            });
            console.log(this.fieldClubForm);

        });
    }

    updateFieldData () {
        if(this.fieldClubForm.valid) {
    for(let field of this.fieldClubForm.controls['fields'].value) {
        console.log('perro');
        console.log(field);
        let cancha: any = {};
        cancha.fieldName = field.fieldName;
        cancha.cantPlayers = field.cantPlayers;
        cancha.fieldType = field.fieldType;
        cancha.services = field.services;
        cancha.price = field.price;
        if(field._id !== '') {
            cancha._id = field._id;
        }
        this.fields.push(cancha);

    }
    console.log(this.fields);
    this.clubService.updateFields(this.club._id, this.fields).subscribe(
        data => {
            this.alertService.success('Los datos se actualizaron correctamente', true);
            },
            error => {
                     this.alertService.error(error);
                     this.loading = false;
        });

        }
    }


}
