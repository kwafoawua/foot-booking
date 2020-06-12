import {Component, OnInit} from '@angular/core';
import {TournamentService} from '../_services/tournament.service';
import {Tournament} from '../_models/tournament';

@Component({
  templateUrl: 'mainManagement.component.html',
})

export class MainManagementComponent implements OnInit {
public myListTournament: Tournament[];
  collectionSize: number;
  pageSize = 5;
  page = 1;

  constructor( private tournamentService: TournamentService) {
  }

  ngOnInit(){
   this.myListTournament = this.tournamentService.getMyTournaments();
   this.collectionSize = this.myListTournament.length;
}

}

