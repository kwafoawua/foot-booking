import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AlertService} from "../../_services/alert.service";
import {ClubService} from "../../_services/club.service";
import {Router} from "@angular/router";
import {UserService} from "../../_services/user.service";
import {FieldFormArrayComponent} from "./field-form-array.component";
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

    constructor(
        private router: Router,
        private clubService: ClubService,
        private alertService: AlertService,
        private fb: FormBuilder,
        private userService: UserService) {}


    ngOnInit(){
        this.createForm();
        this.username = JSON.parse(localStorage.getItem('currentUser')).username;
        this.getClub(this.username);
    }

    createForm() {
        this.fieldClubForm = this.fb.group({
            fields: FieldFormArrayComponent.initFields()
        });
    }

    private getClub (username: string) {
        this.userService.getByUsername(username).subscribe(userClub => {

            this.club = userClub.creator;
            this.fieldClubForm.setValue({
                fields: this.club.fields

            });


        });
    }

    actualizar(){}



}
