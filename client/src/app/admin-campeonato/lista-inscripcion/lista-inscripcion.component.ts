import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TournamentService} from '../../_services/tournament.service';

@Component({
  selector: 'app-lista-inscripcion',
  templateUrl: './lista-inscripcion.component.html',
  styleUrls: ['./lista-inscripcion.component.css']
})
export class ListaInscripcionComponent implements OnInit {

  @Input() inscriptions: any[];
  @Output() updateInscriptions = new EventEmitter<any[]>();

  colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

  constructor(private tournamentService: TournamentService, public dialog: MatDialog,
              public snackBar: MatSnackBar) {}

  ngOnInit() {
  }

  unsubscribeDialog(tournamentInscription, index) {
    const dialog = this.dialog.open(CancelInscriptionDialogComponent, {
      width: '40%',
      data: tournamentInscription
    });
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.unsubscribeTeam(result, index);
      }
    });
  }

  unsubscribeTeam(inscriptionData, index) {
    this.tournamentService.unsubscribeTeam(inscriptionData._id).subscribe((data: any) => {
      this.inscriptions.splice(index, 1);
      this.updateInscriptions.emit(this.inscriptions);
      this.snackBar.open('Inscripción dada de baja con éxito', null, {duration: 2000});
    }, error => {
      this.snackBar.open('No se pudo dar de baja la inscripción, intentá nuevamente más tarde', null, {duration: 5000});
    });
  }

}

@Component({
  templateUrl: 'cancel-inscription-modal.html'
})
export class CancelInscriptionDialogComponent implements OnInit {
  tournamentInscription: any;

  constructor(
    public dialog: MatDialogRef<CancelInscriptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.tournamentInscription = this.data;
  }

  onCancelClick(): void {
    this.dialog.close();
  }

}
