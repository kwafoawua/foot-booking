import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { TournamentService } from '../../_services/tournament.service';
import { AlertService } from '../../_services';
import { ActivatedRoute, Router } from '@angular/router';
import { fixtureRegexp } from '../../../utils/utils';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class FixtureComponent implements OnInit {

  @Input() inscriptions: any[];
  @Input() user: any;
  maxDate: Date;
  minDate: Date;
  tournamentId: string;
  esSinAsignar: boolean;
  isGenerable: boolean;
  phases: any;
  phaseDateList: any[];

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
    private router: Router
  ) { }

  ngOnInit() {
    this.tournamentId = this.route.snapshot.params[ 'id' ];
    if (this.tournamentId) {
      this.getPhases();
      this.getTournament();
    }
    if (this.user == null){
      this.user = 'Club';
    }
    console.log('el usuario' + this.user)
  }

  getTournament() {
    this.tournamentService.getTournamentInfo(this.tournamentId).subscribe((data: any) => {
      this.maxDate = new Date(data.tournament.endDate);
      this.minDate = new Date(data.tournament.startDate);
      console.log(this.maxDate, this.minDate);
    });
  }

  updateMatch($event) {
    console.log('event', $event);
    const local = $event.teams[ 0 ];
    const visitor = $event.teams[ 1 ];
    let nextUpdate;
    const match = {
      tournamentId: $event.tournamentId,
      matchId: $event.id,
      visitorTeam: visitor.name,
      localTeam: local.name,
      localGoals: local.score,
      visitorGoals: visitor.score,
      hourDate: $event.hourDate
    };
    const finalizado = (visitor.score >= 0) && (local.score >= 0);
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
          nextUpdate = this.getNextMatch({phaseIndex: 3, matchIndex: i2, tournamentId: $event.tournamentId, teamName: nextTeamName});
          break;
        case 'Final':
          const i1 = this.phases[1].matches.findIndex(m => m._id === $event.id);
          nextUpdate = this.getNextMatch({phaseIndex: 4, matchIndex: i1, tournamentId: $event.tournamentId, teamName: nextTeamName});
          break;
        default:
      }

      this.tournamentService.updateMatch(nextUpdate).subscribe(response => {
          console.log('update next match', response);
          this.getPhases();
        },
        error => {
          console.log('error ', error);
        });
    }

    this.tournamentService.updateMatch(match).subscribe(response => {
      console.log('success', response);
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
      this.phases = data.phases;
      this.phaseDateList = [
        {
          state: false,
          date: null,
          name: 'octavos',
          phaseId: this.phases[0]._id
        },
        {
          state: false,
          date: null,
          name: 'cuartos',
          phaseId: this.phases[1]._id
        },
        {
          state: false,
          date: null,
          name: 'semifinales',
          phaseId: this.phases[2]._id
        },
        {
          state: false,
          date: null,
          name: 'finales',
          phaseId: this.phases[3]._id
        }
      ];
    });
  }

  setEsSinAsignar(phases: any) {
    this.esSinAsignar = phases.every(phase => {
      const pendingState = phase.matches.every((match: any) => {
        return match.state === 'Sin asignar';
      });
      return pendingState === true;
    });
  }

  shuffleMatches() {
    this.tournamentService.shuffleMatches(this.tournamentId).subscribe((data: any) => {
      console.log('shuffle data', data);
      this.esSinAsignar = false;
      this.getPhases();
    });
  }

  mapPhaseToMatch(match, phaseId, phaseType, tournamentId) {
    console.log('mapPHaseToMatch match', match);
    console.log('maphasetomatch regexpq', fixtureRegexp(match.localTeam.teamName));
    const localTeamName = !fixtureRegexp(match.localTeam.teamName) ? match.localTeam.teamName : null;
    const visitorTeamName = !fixtureRegexp(match.visitorTeam.teamName) ? match.visitorTeam.teamName : null;
    return {
      tournamentId,
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
          return this.mapPhaseToMatch(match, phase._id, phaseType, tournamentId);
        });
        rounds.push(round);
      } else if (phaseType === 'Final') {
        const match = phase.matches[ 0 ];
        lastRound.matches[ 0 ] = this.mapPhaseToMatch(match, phase._id, phaseType, tournamentId);
      } else {
        const match = phase.matches[ 0 ];
        lastRound.matches[ 1 ] = this.mapPhaseToMatch(match, phase._id, phaseType, tournamentId);
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
        console.log(data);
        this.phaseDateList[index].state = false;

      });

    }

  }
}
