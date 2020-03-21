/**
 * Created by USUARIO on 16/10/2017.
 */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../_services/user.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { PasswordValidation } from '../../_helpers/index';
import {AlertService} from "../../_services/alert.service";


@Component({
    moduleId: module.id,
    templateUrl: 'profile-club-password.component.html'
})
export class ProfileClubPasswordComponent implements OnInit{
    passwordForm : FormGroup;
    repeatPassword : string;
    username: string;



    constructor(private fb: FormBuilder,
                private route:ActivatedRoute,
                private alertService: AlertService,
                private userService: UserService){
    }
    ngOnInit(){
        this.createForm();
        this.username = JSON.parse(localStorage.getItem('currentUser')).username;
    }

    private createForm () {
        this.passwordForm = this.fb.group({
            password: [null,Validators.compose([Validators.required, Validators.minLength(8)])],//falta validar contraseña
            repeatPassword: [null, Validators.compose([Validators.required])]
        },{validator: PasswordValidation.MatchPassword // your validation method
            });
    }

    updatePassword() {
        let password = this.passwordForm.value.password;
        let user= {
            password: password,
            username: this.username
        };
        console.log(password);
        console.log('coso');
        this.userService.updatePassword(user)
            .subscribe(
                data => {
                    this.alertService.success('La password se modificó con éxito', true);
                },
                error => {
                    this.alertService.error(error);
                });
    }

}
