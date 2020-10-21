import {Component, Input, OnInit} from '@angular/core';
import {Tournament} from '../_models/tournament';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {TournamentService} from '../_services/tournament.service';
import {AlertService} from '../_services';

@Component({
  templateUrl: './CampeonatoInscripcion.component.html',
  selector: 'camp-insc'
})

export class CampeonatoInscripcionComponent implements OnInit{
  @Input() torneo: Tournament;
  inscripcionForm: FormGroup;
  isLinear: false;

  ngOnInit(): void {
    this.createForm();
  }

  constructor(private route: ActivatedRoute,
              private tournamentService: TournamentService,
              private fb: FormBuilder,
              private alertService: AlertService) {
  }


  createForm() {
    this.inscripcionForm = this.fb.group({
      idTournament: [''],
      team: [null, [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
      name: [null, [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
      phoneNumber: [null, [Validators.required, Validators.maxLength(12), Validators.minLength(1)]],
    });
    this.inscripcionForm.controls.idTournament.setValue(this.route.snapshot.params.id) ;
  }

  Inscribir() {
    console.log('ël form validado', this.inscripcionForm);
    if (this.inscripcionForm.valid) {
      console.log('ël form validado', this.inscripcionForm);
      {
        this.tournamentService.createInscription(this.inscripcionForm.value).subscribe(data => {
            this.alertService.success('La inscripción se registró con éxito', true),
              console.log('el form', this.inscripcionForm);

          },
          error => {
            this.alertService.error(error, false);
          }
        );
      }
      this.createForm();

    }
    else { this.alertService.error('error al registrar la inscripción', this.inscripcionForm.value); }
  }


}
