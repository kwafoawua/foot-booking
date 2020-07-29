import {Component, OnInit} from '@angular/core';
import {TournamentService} from '../_services/tournament.service';
import {Tournament} from '../_models/tournament';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  templateUrl: 'mainManagement.component.html',
})

export class MainManagementComponent implements OnInit {
public myListTournament: Tournament[];
public models;
  collectionSize: number;
  pageSize = 5;
  page = 1;
  id: string;
  public myTournament: any;

  constructor( private tournamentService: TournamentService, private router: Router) {
  }

  ngOnInit(){
   this.getMyTournament();
}

  goToStage(){
    this.router.navigate([ 'campeonato/administrar-fases' ]);
  }

  getMyTournament(){
    this.id = JSON.parse(localStorage.getItem('currentUser'))._id;
    this.tournamentService.getMyTournaments(this.id).subscribe((data: any) => {
      this.myTournament = data.tournament;
    }, error => console.log(error));
// //  this.collectionSize = this.myListTournament.length;
//     console.log('this.tournament' + this.myTournament);
    console.log('los datos ' + this.myTournament.valueOf());
  }
}

