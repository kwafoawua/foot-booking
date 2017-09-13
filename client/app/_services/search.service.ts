/**
 * Created by pablo on 23/8/2017.
 */
import {Injectable} from '@angular/core';
import {Http, Response}       from '@angular/http';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Club}           from '../_models/club';
import {formArrayNameProvider} from "@angular/forms/src/directives/reactive_directives/form_group_name";
import {ClubFilter} from "../Filter/ClubFilter/clubfilter";

@Injectable()

export class SearchService {

    private form: FormGroup;
    public static clubs: Club [] = [];


    constructor(private http: Http) {
    }


    findClubsByFilters(filter: ClubFilter) {
        return this.http.get('/findClub/' + JSON.stringify(filter))
            .map((response: Response) => {
            SearchService.clubs = response.json();
            // return  response.json()
        });
    }

    getAll() {
        return this.http.get('/clubs/').map((response: Response) => response.json());
    }


}

