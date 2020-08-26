import { Component, OnInit, ViewChild } from '@angular/core';
import { TournamentService } from '../_services/tournament.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-admin-campeonato',
  templateUrl: './admin-campeonato.component.html',
  styleUrls: ['./admin-campeonato.component.css']
})
export class AdminCampeonatoComponent implements OnInit {
  id: string;
  tournaments: any;
  columnsToDisplay = ['tournamentName', 'state', 'startDate', 'actions'];
  dataSource: any;

  constructor(
    private tournamentService: TournamentService,
  ) { }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.getTournaments();
  }
  getTournaments(){
    this.id = JSON.parse(localStorage.getItem('currentUser'))._id;
    this.tournamentService.getMyTournaments(this.id).subscribe((data: any) => {
      this.tournaments = data.tournament;
      console.log(this.tournaments);
      this.dataSource = new MatTableDataSource(data.tournament);
      this.dataSource.sort = this.sort;
    },
        error => console.log(error));
  }

  goToTournamentManagment(id) {
    console.log(id);
  }

}
