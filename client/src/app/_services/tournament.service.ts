import { Tournament } from '../_models/tournament';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {TState} from '../_models/TState';
import {Booking} from "../_models/booking";

@Injectable()

export class TournamentService {

private tState: TState[] = [
  { id: 1, name: 'Nuevo' },
  {id: 2, name: 'Publicado' },
  {id: 3, name: 'Iniciado' },
  {id: 4, name: 'Finalizado' },
  {id: 5, name: 'Cancelado' }];

  private tType: string[] = [ '5 Jugadores', '7 Jugadores', '11 Jugadores'];

  private categorias: string[] = ['Femenino', 'Masculino', 'Mixto'];

  constructor(private http: HttpClient) {
  }

  create(tournament: Tournament){
    return this.http.post('/tournament/register', tournament);
  }

  getTournamentType() {
    return this.tType;
  }

  // This will iterates the fields of a club an return what type of tournament can create
  getTournamentTypeForClub(id: string){
    return this.http.get('/club/fieldsCapacities/' + id);
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
    return this.http.post('/inscription/enroll', equipo);
  }

  getAllInscriptions(id: string) {
    return this.http.get(`/inscription/tournament/${id}`);
  }


  updateMatch(match: any) {
    return this.http.put('/phase/updatePhaseMatch', match);
  }

  updatePhase(phase: any) {
    return this.http.put('/phase/updatePhase', phase);
  }

  getInscriptionByUser(user: any, params){
    return this.http.get<any[]>('/inscription/player/' + user, {params});
  }

  calculateWinners(matchesFinal, matchesTercerPuesto) {
    const localFinal = matchesFinal[0].localTeam;
    const visitorFinal = matchesFinal[0].visitorTeam;
    const localTercero = matchesTercerPuesto[0].localTeam;
    const visitorTercero = matchesTercerPuesto[0].visitorTeam;
    let primerEquipo, segundoEquipo, tercerEquipo;
    if (
      localFinal.goals !== undefined &&
      visitorFinal.goals !== undefined &&
      localTercero.goals !== undefined &&
      visitorTercero.goals !== undefined
    ) {
      primerEquipo = visitorFinal.goals > localFinal.goals ? visitorFinal.teamName : localFinal.teamName;
      segundoEquipo = visitorFinal.goals < localFinal.goals ? visitorFinal.teamName : localFinal.teamName;
      tercerEquipo = visitorTercero.goals > localTercero.goals ? visitorTercero.teamName : localTercero.teamName;
      console.table({primer: primerEquipo, segundo: segundoEquipo, tercero: tercerEquipo});

      return {
        primerEquipo,
        segundoEquipo,
        tercerEquipo
      };
    } else {
      return false;
    }


  }
}
