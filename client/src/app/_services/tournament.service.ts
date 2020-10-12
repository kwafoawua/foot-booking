import { Tournament } from '../_models/tournament';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {TState} from '../_models/TState';

@Injectable()

export class TournamentService {

private tState: TState[] = [
  {
  id: 1,
  name: 'Nuevo'
},
  {id: 2,
  name: 'Publicado'
  },
  {id: 3,
  name: 'Iniciado'
  },
  {id: 4,
  name: 'Finalizado'
  },
  {id: 5,
    name: 'Cancelado'
  }];

  private tType: string[] = [ '5 Jugadores', '7 Jugadores', '11 Jugadores'];

  private categorias: string[] = ['Femenino', 'Masculino', 'Mixto'];

  constructor(private http: HttpClient) {
  }

  create(tournament: Tournament){
    console.log('El service ', tournament);
    return this.http.post('/tournament/register', tournament);
  }

  getTournamentType() {
    return this.tType;
  }

  getTournamentCategories(){
    return this.categorias;
  }

  getMyTournaments(id: string){
  return this.http.get<Tournament[]>('/tournament/club/' + id);
  }

  getTournamentInfo(id: string){
    return this.http.get<Tournament>('/tournament/' + id);
  }

  updateTournament(torneo: any) {
    return this.http.put('/tournament/' + torneo._id, torneo);
  }

  getPhases(id: string) {
    return this.http.get('/phase/tournaments/' + id);
  }

  shuffleMatches(id: string) {
    return this.http.get(`/phase/shuffleMatches/${id}`);
  }

  createInscription(equipo: any){
    console.log('El service el equipooooooooo El service el equipooooooooo  ', equipo);
    return this.http.post('/inscription/enroll', equipo);
  }

  getAllInscriptions(id: string) {
    return this.http.get(`/inscription/tournament/${id}`);
  }

}
