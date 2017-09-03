/**
 * Created by pablo on 23/8/2017.
 */
import { Injectable } from '@angular/core';
import { Http,Response }       from '@angular/http';
import {FormControl, FormGroup} from '@angular/forms';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Club }           from '../_models/club';
import {formArrayNameProvider} from "@angular/forms/src/directives/reactive_directives/form_group_name";
import {ClubFilter} from "../Filter/ClubFilter/clubfilter";

@Injectable()

export class SearchService {

    private form: FormGroup;
    private clubs: Club[]= [];


    constructor(private http: Http) { }



    findClubsByFilters(clubname: string){

        console.log("esto es el service" + clubname);
        return this.http.get(`/clubsfind/?name=${clubname}`).map((response: Response) => response.json());
    }

    getAll() {
        return this.http.get('/clubs').map((response: Response) => response.json());
    }

    /*
    public findClubsByFilters(clubFilter: ClubFilter){
        return this.http.get('/clubs/' + string).map((response: Response) => response.json());
    }
    */





}

