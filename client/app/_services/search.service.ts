/**
 * Created by pablo on 23/8/2017.
 */
import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Club }           from '../_models/club';

@Injectable()

export class SearchService {

    constructor(private http: Http) {}

    search(term: string): Observable<Club[]> {
        return this.http
            .get(`/club/?name=${term}`).map(response => response.json().data as Club[]);
    }
}

