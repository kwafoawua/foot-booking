import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TournamentService } from '../../_services/tournament.service';
import { AlertService } from '../../_services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-definicion',
  templateUrl: './definicion.component.html',
  styleUrls: ['./definicion.component.css']
})
export class DefinicionComponent implements OnInit {
  tournamentForm: FormGroup;

  constructor(
  private fb: FormBuilder,
  private tournamentService: TournamentService,
  private alertService: AlertService,
  private route: ActivatedRoute,
  private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
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
      numbersOfTeams: [ null, Validators.required ],
      inscriptionCost: [ null, Validators.required ],
      tournamentType: [ null, Validators.required ],
      category: [ null, Validators.required ],
      termsAndConditions : [ null, Validators.compose([ Validators.required, Validators.maxLength(255) ]) ],
      prize1: [null, Validators.required],
      prize2: [null],
      prize3: [null]
    });
  }

}
