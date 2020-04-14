import { Tournament } from '../_models/tournament';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()

export class TournamentService {

  constructor(private http: HttpClient) {
  }

  create(tournament: any) {
    console.log('El service ', tournament);
    return this.http.post('/tournament/register', tournament);
  }

}
