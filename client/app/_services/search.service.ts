
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Club } from '../_models/club';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { ClubFilter } from '../_models/clubfilter';
import { Service } from '../_models/service';
import { map } from 'rxjs/operators/map';

@Injectable()
export class SearchService {

  private service: Service[] = [
    { id: 1, name: 'Asador' },
    { id: 2, name: 'Buffet' },
    { id: 3, name: 'Parking' },
    { id: 4, name: 'Techado' },
    { id: 5, name: 'Bar' },
    { id: 6, name: 'Nocturno' }
  ];


  private form: FormGroup;
  public static clubs: Club [] = [];


  constructor(private http: HttpClient) {
  }

  findClubsByFilters(filter: ClubFilter) {
    console.log('en esl servico', filter)
    return this.http.get<Club[]>('/findClub/' + JSON.stringify(filter))
      .pipe(map(response => SearchService.clubs = response));
  }

  getAll() {
    return this.http.get<Club[]>('/clubs/');
  }

  getClubServices() {
    return this.service;
  }

  findClubsByMultipleFilter(filter: ClubFilter) {
    console.log('en esl servico', filter)
    return this.http.get<Club[]>('/findClubsByFilters/' + JSON.stringify(filter))
      .pipe(map(response => SearchService.clubs = response));
  }

}
