import { Tournament } from '../_models/tournament';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {TState} from '../_models/TState';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'
import { DatePipe } from '@angular/common';

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
  pipe = new DatePipe('es-AR'); // Use your own locale

  myTournamentData = {
    rounds: [
      {
        type: 'Winnerbracket',
        matches: [
          {
            round: 'Octavos',
            id: '16-1',
            hourDate: null,
            teams: [{ name: '--', score: 0 }, { name: '--', score: 0 }]
          },
          {
            round: 'Octavos',
            id: '16-2',
            hourDate: null,
            teams: [{ name: '--', score: 0 }, { name: '--', score: 0 }]
          },
          {
            round: 'Octavos',
            id: '16-3',
            hourDate: null,
            teams: [{ name: '--', score: 0 }, { name: '--', score: 0 }]
          },
          {
            round: 'Octavos',
            id: '16-4',
            hourDate: null,
            teams: [{ name: '--', score: 0 }, { name: '--', score: 0 }]
          },
          {
            round: 'Octavos',
            id: '16-5',
            hourDate: null,
            teams: [{ name: '--', score: 0 }, { name: '--', score: 0 }]
          },
          {
            round: 'Octavos',
            id: '16-6',
            hourDate: null,
            teams: [{ name: '--', score: 0 }, { name: '--', score: 0 }]
          },
          {
            round: 'Octavos',
            id: '16-7',
            hourDate: null,
            teams: [{ name: '--', score: 0 }, { name: '--', score: 0 }]
          },
          {
            round: 'Octavos',
            id: '16-8',
            hourDate: null,
            teams: [{ name: '--', score: 0 }, { name: '--', score: 0 }]
          }
        ]
      },
      {
        type: 'Winnerbracket',
        matches: [
          {
            round: 'Cuartos',
            id: '8-1',
            hourDate: null,
            teams: [{ name: '--', score: 0 }, { name: '--', score: 0 }]
          },
          {
            round: 'Cuartos',
            id: '8-2',
            hourDate: null,
            teams: [{ name: '--', score: 0 }, { name: '--', score: 0 }]
          },
          {
            round: 'Cuartos',
            id: '8-3',
            hourDate: null,
            teams: [{ name: '--', score: 0 }, { name: '--', score: 0 }]
          },
          {
            round: 'Cuartos',
            id: '8-4',
            hourDate: null,
            teams: [{ name: '--', score: 0 }, { name: '--', score: 0 }]
          }
        ]
      },
      {
        type: 'Winnerbracket',
        matches: [
          {
            round: 'Semifinales',
            id: '4-1',
            hourDate: null,
            teams: [{ name: '--', score: 0 }, { name: '--', score: 0 }]
          },
          {
            round: 'Semifinales',
            id: '4-2',
            hourDate: null,
            teams: [{ name: '--', score: 0 }, { name: '--', score: 0 }]
          }
        ]
      },
      {
        type: 'Final',
        matches: [
          {
            round: 'Final',
            id: '2-1',
            hourDate: null,
            teams: [{ name: '--', score: 0 }, { name: '--', score: 0 }]
          },
          {
            round: 'Final',
            id: '2-2',
            hourDate: null,
            teams: [{ name: '--', score: 0 }, { name: '--', score: 0 }]
          },
        ]
      }
    ]
  };

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

  getInitialTournamentData() {
    return this.myTournamentData;
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

  getTournamentsInscriptions(id: string) {
    return this.http.get(`/tournamentsInscriptions/${id}`);
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

  unsubscribeTeam(id: string) {
    return this.http.delete(`/inscription/${id}`);
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

  downloadFixture(phases, nombreCampeonato) {
    const doc = new jsPDF();
    doc.text(`Fixture - Campeonato: ${nombreCampeonato}`, 14, 25);
    const body = [];
    phases.forEach(phase => {
      const matchInfo = {} as any;
      matchInfo.phaseType = phase.phaseType;
      phase.matches.forEach(match => {
        const ltg = match.localTeam.goals;
        const vtg = match.visitorTeam.goals;
        const isLtg = typeof(ltg) === 'number' && ltg >= 0;
        const isVtg = typeof(vtg) === 'number' && vtg >= 0;
        const localTeam = match.localTeam.teamName && isLtg ?  `${match.localTeam.teamName} ${isLtg ? ' - ' + ltg : ''}` : '-';
        matchInfo.localTeam = localTeam;
        const visitorTeam = match.visitorTeam.teamName && isVtg ?  `${match.visitorTeam.teamName} ${isVtg ? ' - ' + vtg : ''}` : '-';
        matchInfo.localTeam = localTeam;
        matchInfo.visitorTeam = visitorTeam;
        matchInfo.fecha = this.pipe.transform(match.dateToPlay, 'shortDate');
        matchInfo.hora = match.hourToPlay;
        matchInfo.cancha = match.fieldName;
        body.push(Object.values(matchInfo));
      });

    })
    autoTable(doc, {
      startY: 40,
      head: [['Fase', 'Equipo Local', 'Equipo Visitante', 'Fecha', 'Hora', 'Cancha']],
      headStyles: { fillColor: '#039c8a' },
      body,
    });
    doc.save(`Fixture-${nombreCampeonato}.pdf`);

  }
}

