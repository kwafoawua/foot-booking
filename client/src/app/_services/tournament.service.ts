import { Tournament } from '../_models/tournament';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Service} from "../_models";
import {NgForm} from "@angular/forms";

@Injectable()

export class TournamentService {

  private tType: string[] = [
    '5 Jugadores', '6 Jugadores',
    '7 Jugadores', '9 Jugadores', '11 Jugadores'];

  private categorias: string[] = ['Femenino', 'Masculino', 'Mixto'];

  constructor(private http: HttpClient) {
  }

  create(tournament: NgForm){
    console.log('El service ', tournament);
    return this.http.post('/tournament/register', tournament);
  }

  getTournamentType() {
    return this.tType;
  }

  getTournamentCategories(){
    return this.categorias;
  }

}
