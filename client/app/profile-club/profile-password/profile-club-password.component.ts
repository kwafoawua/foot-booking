/**
 * Created by USUARIO on 16/10/2017.
 */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../_services/user.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    moduleId: module.id,
    templateUrl: 'profile-club-password.component.html'
})
export class ProfileClubPasswordComponent implements OnInit{
    passwordForm : FormGroup;
    repeatPassword : string;

    constructor(private fb: FormBuilder,
                private route:ActivatedRoute,
                private userService: UserService){
    }
    ngOnInit(){
        this.createForm();
    }

    private createForm () {
        this.passwordForm = this.fb.group({
            password: ''
        });
    }

}
