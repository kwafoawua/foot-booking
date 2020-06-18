import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import {TournamentService} from '../../_services/tournament.service';
import {Tournament} from '../../_models/tournament';

@Component({
    templateUrl: 'tournament-stage.component.html',
})

export class TournamentStageComponent implements OnInit{
  public tournament: Tournament;

    constructor(
        private router: Router,
        private route: ActivatedRoute, private tournamentService: TournamentService){
    }

  ngOnInit(): void {
    console.log(moment().format());
   // this.getTournamentById(this.route.snapshot.params[ 'id' ]);
  }


  // private getTournamentById(_id: string) {
  //   this.tournamentService.getTournamentById(_id).subscribe(tournament => {
  //     this.tournament = tournament;
  //   });
  // }

    public  goToNewStage(){
        this.router.navigate(['stage'], {relativeTo: this.route});
    }

}
