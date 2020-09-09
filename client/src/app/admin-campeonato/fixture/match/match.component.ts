import { Component, Inject, Input, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  match: {
    id: string;
    round: string;
    team: {
      name: string;
      score: string;
    }
  };
}

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
  @Input() match: any;
  @Input() equipos: any;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(match): void {
    console.log(match);
    const dialogRef = this.dialog.open(MatchUpdateDialogComponent, {
      width: '40%',
      data: this.match
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
}

@Component({
  selector: 'app-match-update-dialog',
  templateUrl: 'match-update-dialog.html',
})
export class MatchUpdateDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<MatchUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
