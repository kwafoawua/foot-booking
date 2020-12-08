import {Component, EventEmitter, Inject, OnInit, Output, ViewChild} from '@angular/core';
import { TournamentService } from '../_services/tournament.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CalendarEvent} from "angular-calendar";
import {MatSnackBar} from '@angular/material/snack-bar';

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
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  @Output() updateTorneo = new EventEmitter<string>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit() {
    this.getTournaments();
  }

  getTournaments(){
    this.id = JSON.parse(localStorage.getItem('currentUser'))._id;
    this.tournamentService.getMyTournaments(this.id).subscribe((data: any) => {
      this.tournaments = data.tournament;
      this.dataSource = new MatTableDataSource(data.tournament);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator._intl.itemsPerPageLabel = 'Items por página';
      this.total = data.tournament.length;
    },
        error => console.log(error));
  }

  goToDetail(id) {
    this.router.navigate(['admin/campeonato', id]);
  }



  openDialog(id_torneo): void {
    const dialogRef = this.dialog.open(CancelTorneoDialogComponent, {
      width: '40%',
      data: id_torneo
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateTorneo.emit(result);
        this.cancel(result);
      }
    });
  }

  OcultarCampeonato(id){
    this.tournamentService.updateTournament({_id: id, state: 'Cerrado'}).subscribe((data) => {
        this.getTournaments();
        this.snackBar.open('Campeonato ocultado con éxito', null, {duration: 2000});
      }, error => {
        this.snackBar.open('No ha sido posible ocultar el campeonato en este momento, intentá nuevamente más tarde', null, {duration: 5000});
      }
    );
  }


  cancel(id) {
    this.tournamentService.updateTournament({_id: id, state: 'Cancelado'}).subscribe((data) => {
        this.getTournaments();
        this.snackBar.open('Campeonato cancelado con éxito', null, {duration: 2000});
      }, error => {
        this.snackBar.open('No ha sido posible cancelar el campeonato en este momento, intentá nuevamente más tarde', null, {duration: 5000});
      }
    );
  }

}

@Component({
  selector: 'app-cancel-torneo-dialog',
  templateUrl: 'cancel-campeonato-modal.html',
})
export class CancelTorneoDialogComponent implements OnInit{
  torneoEliminacion: any;

  constructor(
    public dialogRef: MatDialogRef<CancelTorneoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tournamentService: TournamentService,
    ) {}

  onNoClick(): void {
    this.dialogRef.close();
    console.log('data modal', this.data);
  }

  ngOnInit(): void {
    this.torneoEliminacion = this.data;
  }

}

