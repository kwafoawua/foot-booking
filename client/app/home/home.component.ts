﻿import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder,ReactiveFormsModule} from '@angular/forms';
import { User } from '../_models/index';
import { UserService } from '../_services/index';
import {ClubService} from '../_services/index';
import {SearchService} from '../_services/index';
import {Router} from '@angular/router';
import {ClubFilter} from "../Filter/ClubFilter/clubfilter";



@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {

    private form: FormGroup;
    private clubfilter: ClubFilter;

   // constructor(private userService: UserService) {
    //    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //}

    constructor(private searchService: SearchService, private router: Router) {

        this.form = new FormGroup({'clubname': new FormControl('clubname')});
    }

    ngOnInit() {}

    buscarClub(){
        this.buscarClubsPorFiltros()
        this.router.navigate(['results'])
        console.log(this.form.value)
        console.log(this.form);

    }

    //BUSCO POR LOS FILTROS
    private buscarClubsPorFiltros() {
        this.clubfilter = this.crearFiltros();
        console.log("ya cree el filtro");
        this.searchService.findClubsByFilters(this.clubfilter).subscribe();
    }


    //LE PASO LOS DATOS PARA CREAR LOS FILTROS
    private crearFiltros() : ClubFilter {
        let modelform = this.form.value;
        return new ClubFilter(
            modelform.clubname

        )
    }




   // private loadAllUsers() {
   //     this.userService.getAll().subscribe(users => { this.users = users; });
   // }

  //  private findClub(){
 //       this.clubService.getAll();
//
    //}



}