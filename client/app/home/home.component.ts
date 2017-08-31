import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder,ReactiveFormsModule} from '@angular/forms';
import { User } from '../_models/index';
import { UserService } from '../_services/index';
import {ClubService} from '../_services/index';
import {SearchService} from '../_services/index';
import {Router} from '@angular/router';


@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {

    currentUser: User;
    users: User[] = [];
    private form: FormGroup;

   // constructor(private userService: UserService) {
    //    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //}

    constructor(private searchService: SearchService, private router: Router) {

        this.form= new FormGroup({'name': new FormControl('pablo')});
    }

    ngOnInit() {
       // this.findClub();
    }

    buscarClub(){


        this.router.navigate(['results'])
        console.log(this.form.value)
        console.log(this.form);

    }

   // private loadAllUsers() {
   //     this.userService.getAll().subscribe(users => { this.users = users; });
   // }

  //  private findClub(){
 //       this.clubService.getAll();
//
    //}



}