import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface IMatch {
  match: {
    id: string;
    round: string;
    hourDate: string;
    teams: [{
      name: string;
      score: string;
    },
      {
        name: string;
        score: string;
      }]
  };
  teams: any[];
}

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
  @Input() match: any;
  @Input() teams: any;
  @Output() updateMatch = new EventEmitter<IMatch>();

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(match): void {
    const dialogRef = this.dialog.open(MatchUpdateDialogComponent, {
      width: '40%',
      data: { match: this.match, teams: this.teams }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateMatch.emit(result);
      }

    });
  }
}

@Component({
  selector: 'app-match-update-dialog',
  templateUrl: 'match-update-dialog.html',
})
export class MatchUpdateDialogComponent implements OnInit{
  match: any;
  inscriptions: any;
  disabledSelect = false;
  constructor(
    public dialogRef: MatDialogRef<MatchUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IMatch) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.match = this.data.match;
    this.inscriptions = this.data.teams;
    this.disabledSelect = (this.match.phaseType === 'Octavos de final');
  }

}
