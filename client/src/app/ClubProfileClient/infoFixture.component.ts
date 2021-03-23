import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TournamentService} from '../_services/tournament.service';
import {Tournament} from '../_models/tournament';
import {fixtureRegexp} from '../../utils/utils';


@Component({
  selector: 'info-fixture',
  templateUrl: './infoFixture.component.html',
  styleUrls: ['./fixture2.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class InfoFixtureComponent implements OnInit{
  @Input() inscriptions: any[];
  @Input() torneo: Tournament;
  @Output() setWinners = new EventEmitter<any>();
  phases: any;
  phaseDateList: any[];
  myTournamentData: any;


  constructor(
    private route: ActivatedRoute,
    private tournamentService: TournamentService,
  ) {}


  ngOnInit() {
    this.getPhases();
  }

  getPhases() {
    this.tournamentService.getPhases(this.route.snapshot.params.id).subscribe((data: any) => {
      if (!this.phases) {
        const winners = this.tournamentService.calculateWinners(data.phases[4].matches, data.phases[3].matches);
        this.setWinners.emit(winners);
      }
      this.generateTournamentData(data.phases);
      this.phases = data.phases;
    });
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

  mapPhaseToMatch(match, phaseId, phaseType, tournamentId) {
    const localTeamName = match.localTeam.teamName ? match.localTeam.teamName : '-';
    const visitorTeamName = match.visitorTeam.teamName ? match.visitorTeam.teamName : '-';
    return {
      field: null,
      fieldId: match.fieldId,
      fieldName: match.fieldName,
      tournamentId,
      hourDate: match.hourToPlay || null,
      dateToPlay: match.dateToPlay || null,
      id: match._id,
      state: match.state,
      phaseId,
      phaseType,
      bookingId: match.bookingId || null,
      teams: [
        { name: localTeamName, score: match.localTeam.goals >= 0 ? match.localTeam.goals : null },
        { name: visitorTeamName, score: match.localTeam.goals >= 0 ? match.visitorTeam.goals : null }
      ]
    };
  }

  updateMatch(){};

}
