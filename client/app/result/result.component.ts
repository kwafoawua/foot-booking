/**
 * Created by pablo on 23/8/2017.
 */

import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router'
import {SearchService} from '../_services/index'
import {Club} from '../_models/club';
import {ClubService} from '../_services/index';
import {Observable}  from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {ActivatedRoute} from '@angular/router';


// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {ClubFilter} from "../_models/clubfilter";
import {Service} from "../_models/service";

@Component({
    selector: 'results',
    templateUrl: 'app/result/result.component.html',
    providers: [SearchService],
})






export class ResultComponent implements OnInit {


    private form: FormGroup;
    private clubfilter: ClubFilter;
    public clubs: Club[];
    public services: Service[];
  //  private servicesChecked : Service = [];
    clubname = "";





    constructor(private activatedRoute: ActivatedRoute,
                private searchService: SearchService,
                private router: Router) {

       // this.form = new FormGroup({'clubname': new FormControl('clubname')});
    }

    ngOnInit(): void {
        this.clubs = SearchService.clubs;
        this.services = this.searchService.getClubServices()

    }


//LE PASO LOS DATOS PARA CREAR LOS FILTROS
    private crearFiltros(): ClubFilter {
       // let modelform = this.form.value;
        return new ClubFilter(
       this.clubname,
        //    modelform.clubname,
       //  this.servicesChecked
        )
    }

//BUSCO POR LOS FILTROS

    private buscarClubsPorFiltros() {
        this.clubfilter = this.crearFiltros();
        console.log("ya cree el filtro",this.clubfilter);
        this.searchService.findClubsByFilters(this.clubfilter).subscribe(() => {
            this.clubs = SearchService.clubs;
        });
    console.log(this.clubfilter)
    }

    /*
 addService(e:any){

        if(e.state){

            console.log("agrego el servicio ",e.name)
            this.servicesChecked.push({'id':e.id,'name': e.name});
           // console.log("array", this.servicesChecked)
        } else {
            console.log("saco el servicio",e.name);
            for (var i =0; i < this.servicesChecked.length; i++)
                if (this.servicesChecked[i].name === e.name) {
                    this.servicesChecked.splice(i,1);
                    break;
                }
       }
    }
    */

}