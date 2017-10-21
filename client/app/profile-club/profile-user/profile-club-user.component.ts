/**
 * Created by USUARIO on 16/10/2017.
 */

import {Component, OnInit, DoCheck} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../_services/user.service";
import {Observable} from "rxjs/Observable";

@Component({
    moduleId: module.id,
    templateUrl: 'profile-club-user.component.html'
})
export class ProfileClubUserComponent implements OnInit, DoCheck{

    userForm : FormGroup;
    username: string;
    user: any = {};
    //user: Observable<any>;

    constructor(private fb: FormBuilder,
                private route:ActivatedRoute,
    private userService: UserService){
        this.createForm();
    }
    ngOnInit(){
        this.username = JSON.parse(localStorage.getItem('currentUser')).username;
        //this.user = this.userService.user;
        /*this.userService.user.map(user => {this.user = user});
        console.log(this.user);
        this.userService.getByUsername(this.username);*/
        this.userService.getByUsername(this.username);
        //this.createForm();
        this.userService.usuario$.subscribe(
            userClub => {
                    console.log('profileclubuser: ' + userClub);
                this.user.username = userClub.username;
                this.user.email = userClub.email;
                this.user._id = userClub._id;
                //this.fillForm(userClub.username, userClub.email, userClub._id);
            });

        //this.userForm.setValue({username: this.user.username, email: this.user.email, _id: this.user._id});
        //console.log(this.user);
}
    ngDoCheck() {
        console.log(this.user);
        if(this.user) {

           // this.userForm.setValue({username: this.user.username, email: this.user.email, _id: this.user._id});
            //this.fillForm(this.user.username, this.user.email, this.user._id);
        }
    }

public fillForm (username1, email1, id1) {
    this.userForm.setValue({username: username1, email: email1, _id: id1});
}

    /*private getUser (username: string) {
        this.userService.getByUsername(username).subscribe(userClub => {

            this.user.username = userClub.username;
                this.user.email = userClub.email;
                this.user._id = userClub._id;
            this.userForm.setValue({username: this.user.username, email: this.user.email, _id: this.user._id})});
    }*/

    private createForm () {
        //console.log(this.user.username);
        this.userForm = this.fb.group({
            username: null,
            email: null,
            _id: null
        });
    }

    onSubmit(): void {
        // console.log('Sibling1Component-received from sibling2: ' + this._sharedService.subscribeData());
        console.log('Form submitted-sibling1Form');
        let form = this.userForm.value;
        //this.searchCaseNumber = caseNumber;
        this.userService.publishData(form);
    }

}
