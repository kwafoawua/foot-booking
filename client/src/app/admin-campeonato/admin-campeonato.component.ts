import { Component, OnInit, ViewChild } from '@angular/core';
import { TournamentService } from '../_services/tournament.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

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
  total: number;

  constructor(
    private tournamentService: TournamentService,
    private router: Router
  ) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


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
      this.dataSource.paginator = this.paginator;
      this.total = data.tournament.length;
    },
        error => console.log(error));
  }

  goToDetail(id) {
    this.router.navigate(['admin/campeonato', id]);
  }

  cancel(id) {
    this.tournamentService.updateTournament({_id: id, state: 'Cancelado'}).subscribe((data) => {
      this.getTournaments();
      }
    );
  }

}
