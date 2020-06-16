
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Club } from '../_models/club';
import { ClubFilter } from '../_models/clubfilter';
import { Service } from '../_models/service';
import { map } from 'rxjs/operators';

@Injectable()
export class SearchService {


  constructor(private http: HttpClient) {
  }
  public static clubs: Club [] = [];

  private service: Service[] = [
    { id: 1, name: 'Asador' },
    { id: 2, name: 'Buffet' },
    { id: 3, name: 'Parking' },
    { id: 4, name: 'Techado' },
    { id: 5, name: 'Bar' },
    { id: 6, name: 'Nocturno' }
  ];


  findClubsByFilters(filter: ClubFilter) {
    console.log('en esl servico', filter);
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
