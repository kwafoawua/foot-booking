import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { TournamentService } from '../../_services/tournament.service';
import { AlertService } from '../../_services';
import { ActivatedRoute, Router } from '@angular/router';
import { fixtureRegexp } from '../../../utils/utils';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class FixtureComponent implements OnInit {

  @Input() inscriptions: any[];
  maxDate: Date;
  minDate: Date;
  tournamentId: string;
  esSinAsignar: boolean;
  isGenerable: boolean;
  phases: any;
  phaseDateList: any[];
  sePuedeIniciarCampeonato: boolean;
  sePuedeFinalizarCampeonato: boolean;
  tournamentState: string;
  tournament: any;
  primerEquipo: string;
  segundoEquipo: string;
  tercerEquipo: string;

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

  constructor(
    private tournamentService: TournamentService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.tournamentId = this.route.snapshot.params[ 'id' ];
    if (this.tournamentId) {
      this.getPhases();
      this.getTournament();
    }
  }

  getTournament() {
    this.tournamentService.getTournamentInfo(this.tournamentId).subscribe((data: any) => {
      this.maxDate = new Date(data.tournament.endDate);
      this.minDate = new Date(data.tournament.startDate);
      this.tournamentState = data.tournament.state;
      this.tournament = data.tournament;
    });
  }
  updateMatch($event) {
    const local = $event.teams[ 0 ];
    const visitor = $event.teams[ 1 ];
    let nextUpdate;
    let tercerYCuarto;
    const match = {
      tournamentId: $event.tournamentId,
      matchId: $event.id,
      visitorTeam: visitor.name,
      localTeam: local.name,
      localGoals: local.score,
      visitorGoals: visitor.score,
      hourDate: $event.hourDate
    };
    const finalizado = (visitor.score >= 0 && visitor.score !== null) && (local.score >= 0 && local.score !== null);
    if (finalizado) {
      const nextTeamName = visitor.score > local.score ? visitor.name : local.name;
      switch ($event.phaseType){
        case 'Octavos de final':
         const  i8 = this.phases[0].matches.findIndex(m => m._id === $event.id);
         nextUpdate = this.getNextMatch({phaseIndex: 1, matchIndex: i8, tournamentId: $event.tournamentId, teamName: nextTeamName});
         break;
        case 'Cuartos de final':
          const i4 = this.phases[1].matches.findIndex(m => m._id === $event.id);
          nextUpdate = this.getNextMatch({phaseIndex: 2, matchIndex: i4, tournamentId: $event.tournamentId, teamName: nextTeamName});
          break;
        case 'Semifinal':
          const i2 = this.phases[2].matches.findIndex(m => m._id === $event.id);
          nextUpdate = this.getNextMatch({phaseIndex: 4, matchIndex: i2, tournamentId: $event.tournamentId, teamName: nextTeamName});
          const tercerYCuartoName = visitor.score < local.score ? visitor.name : local.name;
          tercerYCuarto = this.getNextMatch({phaseIndex: 3, matchIndex: i2, tournamentId: $event.tournamentId, teamName: tercerYCuartoName});
          break;
        case 'Final':
          const i1 = this.phases[4].matches.findIndex(m => m._id === $event.id);
          break;
        default:
      }

      if (nextUpdate) {
        this.tournamentService.updateMatch(nextUpdate).subscribe(response => {
            console.log('update next match', response);
            this.getPhases();
          },
          error => {
            console.log('error ', error);
          });
        }
      if (tercerYCuarto) {
        this.tournamentService.updateMatch(tercerYCuarto).subscribe(response => {
            console.log('update next match', response);
            this.getPhases();
          },
          error => {
            console.log('error ', error);
          });
      }
    }


    this.tournamentService.updateMatch(match).subscribe(response => {
      console.log('success', response);
      this.snackBar.open('Partido actualizado con éxito', null, {
        duration: 2000
      });
      this.getPhases();
    },
      error => {
      console.log('error ', error);
    });
  }


  getNextMatch({phaseIndex, matchIndex, tournamentId, teamName}) {
  const actualizarSiguiente = {} as any;
  actualizarSiguiente.tournamentId = tournamentId;
  if (matchIndex % 2 === 0) {
    const nextIndex = matchIndex / 2;
    const nextMatch = this.phases[phaseIndex].matches[nextIndex];
    actualizarSiguiente.matchId = nextMatch._id;
    actualizarSiguiente.localTeam = teamName;
  } else {
    const nextIndex = Math.floor((matchIndex / 2));
    const nextMatch = this.phases[phaseIndex].matches[nextIndex];
    actualizarSiguiente.matchId = nextMatch._id;
    actualizarSiguiente.visitorTeam = teamName;
  }
  return actualizarSiguiente;
}

  getPhases() {
    this.tournamentService.getPhases(this.tournamentId).subscribe((data: any) => {
      this.setEsSinAsignar(data.phases);
      this.generateTournamentData(data.phases);
      this.isGenerable = this.inscriptions.length > 15;
      if (!this.phases) {
        const winners = this.tournamentService.calculateWinners(data.phases[4].matches, data.phases[3].matches);
        if (winners) {
          this.primerEquipo = winners.primerEquipo;
          this.segundoEquipo = winners.segundoEquipo;
          this.tercerEquipo = winners.tercerEquipo;
        }
      }
      this.phases = data.phases;

      this.phaseDateList = [
        {
          state: false,
          date: this.phases[0].dateToPlay || null,
          name: 'Octavos de final',
          phaseId: this.phases[0]._id
        },
        {
          state: false,
          date: this.phases[1].dateToPlay || null,
          name: 'Cuartos de final',
          phaseId: this.phases[1]._id
        },
        {
          state: false,
          date: this.phases[2].dateToPlay || null,
          name: 'Semifinales',
          phaseId: this.phases[2]._id
        },
        {
          state: false,
          date: this.phases[4].dateToPlay || null,
          name: 'Finales',
          phaseId: this.phases[4]._id,
          tercerosId: this.phases[3]._id,
        }
      ];
      this.setOctavosState();
      this.setFinalizarCampeonato(data.phases);
    });
  }

  setEsSinAsignar(phases: any) {
    this.esSinAsignar = phases.every(phase => {
      const pendingState = phase.matches.every((match: any) => {
        return match.state === 'Sin asignar';
      });
      return pendingState;
    });
  }

  setFinalizarCampeonato(phases: any) {
    this.sePuedeFinalizarCampeonato = phases.every(phase => {
      const partidoCompletado = phase.matches.every((match: any) => {
        const localGoals = match.localTeam.goals;
        const visitorGoals = match.visitorTeam.goals;
        return (localGoals >= 0 && localGoals !== null) && (visitorGoals >= 0 && visitorGoals !== null);
      });
      return partidoCompletado;
    });
  }

  shuffleMatches() {
    this.tournamentService.shuffleMatches(this.tournamentId).subscribe((data: any) => {
      console.log('shuffle data', data);
      this.esSinAsignar = false;
      this.getPhases();
    });
  }

  mapPhaseToMatch(match, phaseId, phaseType, tournamentId, dateToPlay) {
    const localTeamName = !fixtureRegexp(match.localTeam.teamName) ? match.localTeam.teamName : null;
    const visitorTeamName = !fixtureRegexp(match.visitorTeam.teamName) ? match.visitorTeam.teamName : null;
    return {
      tournamentId,
      dateToPlay,
      hourDate: match.hourToPlay || null,
      id: match._id,
      state: match.state,
      phaseId,
      phaseType,
      teams: [
        { name: localTeamName, score: match.localTeam.goals >= 0 ? match.localTeam.goals : null },
        { name: visitorTeamName, score: match.localTeam.goals >= 0 ? match.visitorTeam.goals : null }
      ]
    };
  }

  generateTournamentData(phases) {
    const rounds = [];
    const lastRound = {
      type: 'Final',
      matches: []
    };

    for (let i = 0; i < phases.length; i++) {
      const round = {} as any;
      const phase = phases[ i ];
      const phaseType = phase.phaseType;
      const tournamentId = phase.tournamentId;
      if (phaseType !== 'Final' && phaseType !== 'Tercero y Cuarto puesto') {
        round.type = 'Winnerbracket';
        round.matches = phase.matches.map(match => {
          return this.mapPhaseToMatch(match, phase._id, phaseType, tournamentId, phase.dateToPlay);
        });
        rounds.push(round);
      } else if (phaseType === 'Final') {
        const match = phase.matches[ 0 ];
        lastRound.matches[ 0 ] = this.mapPhaseToMatch(match, phase._id, phaseType, tournamentId, phase.dateToPlay);
      } else {
        const match = phase.matches[ 0 ];
        lastRound.matches[ 1 ] = this.mapPhaseToMatch(match, phase._id, phaseType, tournamentId, phase.dateToPlay);
      }
    }

    rounds.push(lastRound);
    this.myTournamentData = { rounds };
  }

  updatePhaseDate(phase, action, index) {
    console.log(phase, action);
    if (action === 'edit') {
      this.phaseDateList[index].state = true;
    } else {
      const toUpdate = {
        phaseId: phase.phaseId,
        dateToPlay: phase.date,
      };
      this.tournamentService.updatePhase(toUpdate).subscribe((data: any) => {
        this.snackBar.open('Fecha actualizada con éxito', null, {
          duration: 2000
        });
        this.phaseDateList[index].state = false;
      });

      if (phase.name === 'Finales') {
        const updateTercerosYCuartos = {
          phaseId: this.phases[3]._id,
          dateToPlay: phase.date,
        };
        this.tournamentService.updatePhase(updateTercerosYCuartos).subscribe((data: any) => {
        });
      }

    }
  }

  setOctavosState() {
    const phasesState = !!this.phaseDateList[ 0 ].date &&
      !!this.phaseDateList[ 1 ].date && !!this.phaseDateList[ 2 ].date &&
      !!this.phaseDateList[ 3 ].date;
    const matchOctavosState = this.phases[ 0 ].matches.every(match => !!match.hourToPlay === true);
    this.sePuedeIniciarCampeonato = phasesState && matchOctavosState;
    console.log('sePuedeIniciarCampeonato', this.sePuedeIniciarCampeonato);
  }

  setCampeonatoState(stateName) {
    this.tournamentService.updateTournament({_id: this.tournamentId, state: stateName}).subscribe((data) => {
      this.tournamentState = stateName;
      const snackMessage = stateName === 'Iniciado' ? 'Se inició el campeonato': 'Se finalizó el campeonato';
      this.snackBar.open(snackMessage, null, {
        duration: 2000
      });
    });

  }
}
