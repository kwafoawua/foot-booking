import {Component, OnInit} from '@angular/core';
import {TournamentService} from '../_services/tournament.service';
import {Tournament} from '../_models/tournament';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from "../_services";


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

  constructor(
    private tournamentService: TournamentService,
    private router: Router,
    private alertService: AlertService) {
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


  publicarTorneo(t: Tournament){
    t.state = 'Publicado';
    this.tournamentService.updateTournament(t).subscribe(data => {
      this.alertService.success('El torneo ha sido publicado con exito!', true);
    },
      error => {
        this.alertService.error(error.error.msg, false);
    }
    );
  }

  cancelarTorneo(t: Tournament){
    t.state = 'Cancelado';
    this.tournamentService.updateTournament(t).subscribe(data => {
        this.alertService.success('El torneo se cancelo con exito!', true);
      },
      error => {
        this.alertService.error(error.error.msg, false);
      }
    );
  }

}

