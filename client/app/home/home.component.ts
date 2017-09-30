import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {User} from '../_models/index';
import {UserService} from '../_services/index';
import {ClubService} from '../_services/index';
import {SearchService} from '../_services/index';
import {Router} from '@angular/router';
import {ClubFilter} from "../_models/clubfilter";


@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {

    private form: FormGroup;
    private clubfilter: ClubFilter;
    lat: number = -31.421272;
    lng: number = -64.183841;
    zoom = 16.88;


    constructor(private searchService: SearchService, private router: Router) {

        this.form = new FormGroup({'clubname': new FormControl('clubname')});
    }

    ngOnInit() {


    }

    buscarClub() {
        this.buscarClubsPorFiltros();
    }

    //BUSCO POR LOS FILTROS
    private buscarClubsPorFiltros() {
        this.clubfilter = this.crearFiltros();
        this.searchService.findClubsByFilters(this.clubfilter)
            .subscribe((a) => {
                console.log('resultado', a);
                this.router.navigate(['results']);
            });
    }


    //LE PASO LOS DATOS PARA CREAR LOS FILTROS
    private crearFiltros(): ClubFilter {
        let modelform = this.form.value;
        return new ClubFilter(
            modelform.clubname
        )
    }





}