import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TournamentService } from '../../_services/tournament.service';
import { AlertService } from '../../_services';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidateAllFields } from '../../_helpers';

@Component({
  selector: 'app-definicion',
  templateUrl: './definicion.component.html',
  styleUrls: ['./definicion.component.css']
})
export class DefinicionComponent implements OnInit {
  tournamentForm: FormGroup;
  tipoTorneo: any;
  categorias: any;
  tournamentId: string;

  constructor(
  private fb: FormBuilder,
  private tournamentService: TournamentService,
  private alertService: AlertService,
  private route: ActivatedRoute,
  private router: Router
  ) { }

  ngOnInit() {
    this.tipoTorneo = this.tournamentService.getTournamentType();
    this.categorias = this.tournamentService.getTournamentCategories();
    this.createForm();

    this.tournamentId = this.route.snapshot.params[ 'id' ];
    if (this.tournamentId) {
      this.getTournament();
    }
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
      numbersOfTeams: [ {value: 16, disabled: true } ],
      inscriptionCost: [ null, Validators.required ],
      tournamentType: [ null, Validators.required ],
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
      console.log(data.tournament);
      const t = data.tournament;
      this.tournamentForm.setValue({
        creatorClubId: t.creatorClubId,
        tournamentName: t.tournamentName,
        publicationDescription: t.publicationDescription,
        inscriptionStartDate: t.inscriptionStartDate,
        inscriptionEndDate: t.inscriptionEndDate,
        startDate: t.startDate,
        endDate: t.endDate,
        numbersOfTeams: 16,
        inscriptionCost: t.inscriptionCost,
        tournamentType: t.tournamentType,
        category: t.category,
        termsAndConditions : t.termsAndConditions,
        prize1: t.prize1,
        prize2: t.prize2,
        prize3: t.prize3
      });
    }, error => console.log(error));
  }

  updateTournament(){
    this.tournamentService.updateTournament(this.tournamentForm.value).subscribe(data => {
      this.alertService.success('Se actualizaron los datos exitosamente', true);
    }, error => {
      this.alertService.error(error.error.msg, false);
    });
  }

  registerTournament() {
    if (this.tournamentForm.valid) {
      const idClub: string = JSON.parse(localStorage.getItem('currentUser'))._id;

      this.tournamentForm.controls['creatorClubId'].setValue(idClub);
      this.tournamentService.create(this.tournamentForm.value).subscribe(data => {
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
}
