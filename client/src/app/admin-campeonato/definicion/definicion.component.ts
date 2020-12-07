import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TournamentService } from '../../_services/tournament.service';
import { AlertService } from '../../_services';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidateAllFields } from '../../_helpers';
import { Tournament } from '../../_models/tournament';
import {MatSnackBar} from '@angular/material';
import * as moment from 'moment';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-definicion',
  templateUrl: './definicion.component.html',
  styleUrls: ['./definicion.component.css']
})
export class DefinicionComponent implements OnInit {
  @Output() updateTorneo = new EventEmitter<string>();
  tournamentForm: FormGroup;
  tipoTorneo: any;
  categorias: any;
  tournamentId: string;
  status = 'Nuevo';
  tournament: Tournament;
  minDate = moment().startOf('day').toDate();
  fechafinValidacion: any;
  fechaInicioInscValidacion: any;
  fechaFinInscValidacion: any;


  constructor(
  private fb: FormBuilder,
  private tournamentService: TournamentService,
  private alertService: AlertService,
  private route: ActivatedRoute,
  private router: Router,
  public snackBar: MatSnackBar,
  public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.categorias = this.tournamentService.getTournamentCategories();
    this.createForm();

    this.tournamentId = this.route.snapshot.params.id;
    if (this.tournamentId) {
      this.getTournament();
    }
    this.getTournamentTypes();
  }

  createForm() {
    this.tournamentForm = this.fb.group({
      creatorClubId: [ null ],
      tournamentName: [ null, Validators.required ],
      publicationDescription: [ null, Validators.compose([ Validators.required, Validators.maxLength(255) ]) ],
      inscriptionStartDate: [ null, Validators.required ],
      inscriptionEndDate: [ null, Validators.required ],
      startDate: [ null, Validators.required ],
      endDate: [ null ],
      numbersOfTeams: [ 16, { disabled: true } ],
      inscriptionCost: [ null, Validators.required ],
      numberOfPlayers: [ null, Validators.required ],
      category: [ null, Validators.required ],
      termsAndConditions : [ null, Validators.compose([ Validators.required, Validators.maxLength(255) ]) ],
      prize1: [null, Validators.required],
      prize2: [null],
      prize3: [null]
    });
  }

  getTournament(){
    // this.esEdicion = true;
    this.tournamentService.getTournamentInfo(this.tournamentId).subscribe((data: any) => {
      this.tournament = data.tournament;
      this.status = this.tournament.state;
      this.tournamentForm.setValue({
        creatorClubId: this.tournament.creatorClubId,
        tournamentName: this.tournament.tournamentName,
        publicationDescription: this.tournament.publicationDescription,
        inscriptionStartDate: this.tournament.inscriptionStartDate,
        inscriptionEndDate: this.tournament.inscriptionEndDate,
        startDate: this.tournament.startDate,
        endDate: this.tournament.endDate,
        numbersOfTeams: 16,
        inscriptionCost: this.tournament.inscriptionCost,
        numberOfPlayers: this.tournament.numberOfPlayers,
        category: this.tournament.category,
        termsAndConditions : this.tournament.termsAndConditions,
        prize1: this.tournament.prize1,
        prize2: this.tournament.prize2,
        prize3: this.tournament.prize3
      });
    }, error => console.log(error));
  }

  updateTournament(){
    this.tournamentService.updateTournament({_id : this.tournamentId, ...this.tournamentForm.value}).subscribe(data => {
      this.snackBar.open('Se actualizaron los datos exitosamente', null, {
        duration: 1000
      });
    }, error => {
      this.snackBar.open('Hubo un error al intentar actualizar los datos', null, {
        duration: 1000
      });
    });
  }

  publishTournament(tournament: any) {

    this.tournamentService.updateTournament(tournament).subscribe(data => {
      this.getTournament();
      this.snackBar.open('Se actualizaron los datos exitosamente', null, {
        duration: 1000
      });
    }, error => {
      this.snackBar.open(error, null, {
        duration: 1000
      });
    });

  }

  registerTournament() {
    if (this.tournamentForm.valid) {
      const idClub: string = JSON.parse(localStorage.getItem('currentUser'))._id;

      this.tournamentForm.controls.creatorClubId.setValue(idClub);
      this.tournamentService.create(this.tournamentForm.value).subscribe(data => {
          this.snackBar.open('El campeonato se registró con éxito', null, {
            duration: 1000
          });
          this.alertService.success('El campeonato se registró con éxito', true),
            this.router.navigate([ '/admin/campeonato' ]);
        },
        error => {
          this.alertService.error(error.error.msg, false);
        }
      );
    } else {
      ValidateAllFields.validateAllFields(this.tournamentForm);
    }
  }

  openDialog(): void {
    const tournament = {
      _id: this.tournamentId,
      state: 'Publicado',
    };

    const dialogRef = this.dialog.open(PublicarTorneoDialogComponent, {
      width: '40%',
      data: tournament
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateTorneo.emit(result);
        this.publishTournament(result);
        console.log('RESULT', result);
      }
    });
  }

  async getTournamentTypes() {
    const idClub: string = JSON.parse(localStorage.getItem('currentUser'))._id;

    this.tournamentService.getTournamentTypeForClub(idClub).subscribe((res: any) => {
      this.tipoTorneo = res.capacities;
      console.log(`como devuelvo el tipo de torneo: ${res.capacities}`);
    });
  }


}


@Component({
  selector: 'app-publicar-torneo-dialog',
  templateUrl: 'publicar-campeonato-modal.html',
})
export class PublicarTorneoDialogComponent implements OnInit{
  torneoPublicacion: any;

  constructor(
    public dialogRef: MatDialogRef<PublicarTorneoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tournamentService: TournamentService,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
    console.log('data modal', this.data);
  }

  ngOnInit(): void {
    this.torneoPublicacion = this.data;
  }

}
