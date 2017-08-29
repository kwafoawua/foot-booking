/**
 * Created by pablo on 23/8/2017.
 */

import { Component, OnInit } from '@angular/core';
import { User } from '../_models/index';
import {Router} from '@angular/router'
import {SearchService} from '../_services/index'
import { Club } from '../_models/club';
import {ClubService} from '../_services/index';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({

    selector:'results',
    templateUrl: 'app/result/result.component.html',

})


export class ResultComponent implements OnInit {
    club: Club[] = [];
   // clubs: Observable<Club[]>;
  //  private searchTerms = new Subject<string>();

    constructor(private clubService : ClubService, private router: Router){}

      //  search(term: string): void {
       // this.searchTerms.next(term);


    private loadAllClubs() {
    this.clubService.getAll().subscribe(clubs => { this.club = clubs; });
    }

    ngOnInit():void {
        this.loadAllClubs();

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
