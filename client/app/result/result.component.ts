/**
 * Created by pablo on 23/8/2017.
 */

import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder,ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router'
import {SearchService} from '../_services/index'
import { Club } from '../_models/club';
import {ClubService} from '../_services/index';
import { Observable }  from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {ActivatedRoute} from '@angular/router';



// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {templateJitUrl} from "@angular/compiler";
import {equalParamsAndUrlSegments} from "@angular/router/src/router_state";
import {ClubFilter} from "../Filter/ClubFilter/clubfilter";

@Component({
    selector:'results',
    templateUrl: 'app/result/result.component.html',
    providers: [SearchService],
})


export class ResultComponent implements OnInit {


   private form: FormGroup;
   private clubfilter : ClubFilter;
   clubname : string;
   club: Club[] = [] ;
  //  private searchTerms = new Subject<string>();

    constructor(private activatedRoute:ActivatedRoute, private searchService : SearchService, private router: Router){

       this.form= new FormGroup({'clubname': new FormControl('clubname')});

    }


/*
    private loadAllClubs() {
    this.clubService.getAll().subscribe(clubs => { this.club = clubs; });
    }
*/

    ngOnInit():void {


    }

    private buscarClubsPorFiltros(){

            console.log(this.clubname);
            if(this.clubname) {
                this.searchService.findClubsByFilters('pepa').subscribe(clubs => {this.club = clubs;
                });
            }



    }

/*
    private buscarClubsPorFiltros(){

        this.clubfilter.name = formModel.clubname;


       let formModel = this.form.value;
        return new ClubFilter(
        formModel.name
        //aca van los otros filtros
        );

        this.searchService.findclubs(this.clubfilter);




    }

    /*   PARA BUSCAR POR FILTRO

            ngOnInit():void {

            this.clubs = this.searchTerms
                .debounceTime(300)        // wait 300ms after each keystroke before considering the term
                .distinctUntilChanged()   // ignore if next search term is same as previous
                .switchMap(term => term   // switch to new observable each time the term changes
                  // return the http search observable
                    ? this.clubSearchService.search(term)
                    : Observable.of<Club[]>([]))
                .catch(error => {
                    // TODO: add real error handling
                    console.log(error);
                    return Observable.of<Club[]>([]);
                });

        }

     FIN PARA BUSCAR CON FILTRO */

   // gotoDetail(club: Club): void {
   //     let link = ['/detail', club._id;
   //     this.router.navigate(link);
   // }

}
