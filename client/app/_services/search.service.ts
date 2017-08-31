/**
 * Created by pablo on 23/8/2017.
 */
import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import {FormControl, FormGroup} from '@angular/forms';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Club }           from '../_models/club';
import {formArrayNameProvider} from "@angular/forms/src/directives/reactive_directives/form_group_name";

@Injectable()

export class SearchService {

    private form: FormGroup;
    private clubs: Club[]= [];

    constructor() {
        this.form= new FormGroup({'nombre': new FormControl});


    }






}

