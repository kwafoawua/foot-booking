import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgttTournament } from 'ng-tournament-tree';
import { TournamentService } from '../../_services/tournament.service';
import { AlertService } from '../../_services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class FixtureComponent implements OnInit {

  teamNames = [
    'Team 1', 'Team 2', 'Team 3', 'Team 4', 'Team 5', 'Team 6', 'Team 7', 'Team 8', 'Team 9', 'Team 10', 'Team 11', 'Team 12',
    'Team 13', 'Team 14', 'Team 15', 'Team 16'
  ];
  editOctavos = false;
  editCuartos = false;
  editSemifinales = false;
  editFinales = false;
  fechaOctavos: string;
  fechaCuartos: string;
  fechaSemi: string;
  fechaFinal: string;
  tournamentId: string;
  esSinAsignar: boolean;


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
    }
  }

  updateMatch($event) {
    console.log('fixture update');
    console.log($event);
    console.log('is tournament data updated?', this.myTournamentData);
  }

  getPhases() {
    this.tournamentService.getPhases(this.tournamentId).subscribe((data: any) => {
      console.log('fases', data);
      this.setEsSinAsignar(data.phases);

      console.log('es pendiendte de juego', this.esSinAsignar);
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
      this.esSinAsignar = false;
    });
  }
}
