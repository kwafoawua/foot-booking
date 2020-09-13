import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface IMatch {
  match: {
    id: string;
    round: string;
    teams: [{
      name: string;
      score: string;
    },
      {
        name: string;
        score: string;
      }]
  };
  teamNames: string[];
}

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
  @Input() match: any;
  @Input() teamNames: any;
  @Output() updateMatch = new EventEmitter<IMatch>();

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(match): void {
    console.log(match);
    const dialogRef = this.dialog.open(MatchUpdateDialogComponent, {
      width: '40%',
      data: { match: this.match, teamNames: this.teamNames }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.updateMatch.emit(result);
      console.log('The dialog was closed', result);
    });
  }
}

@Component({
  selector: 'app-match-update-dialog',
  templateUrl: 'match-update-dialog.html',
})
export class MatchUpdateDialogComponent implements OnInit{
  match: any;
  constructor(
    public dialogRef: MatDialogRef<MatchUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IMatch) {}

  onNoClick(): void {
    this.dialogRef.close();
    console.log(this.match);
  }

  ngOnInit(): void {
    this.match = this.data.match;
  }

}
