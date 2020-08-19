import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TournamentService} from '../_services/tournament.service';
import {Tournament} from '../_models/tournament';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../_services';


@Component({
  templateUrl: './CampeonatoInfo.component.html'
})

export class CampeonatoInfoComponent implements OnInit {
  torneo: Tournament;
  inscripcionForm: FormGroup;

  ngOnInit(): void {
    this.getTorneo(this.route.snapshot.params.id);
    this.createForm();
  }

  constructor(private route: ActivatedRoute,
              private tournamentService: TournamentService,
              private fb: FormBuilder,
              private alertService: AlertService) {
  }

  getTorneo(torneoId: string) {
    this.tournamentService.getTournamentInfo(torneoId).subscribe((data: any) => {
      this.torneo = data.tournament;
      console.log('los datos ' + this.torneo.valueOf());
    }, error => console.log(error));

  }

  createForm() {
    this.inscripcionForm = this.fb.group({
    //  idTournament: [this.torneo.idTournament],
      nombreEquipo: [null, Validators.required],
      nombreResponsable: [null, Validators.required],
      apellidoResponsable: [null, Validators.required],
      emai: [null, Validators.required],
      telefono: [null, Validators.required],
    });
  }

  Inscribir() {
    if (this.inscripcionForm.valid) {
      {

        console.log('el formulario', this.inscripcionForm);
        this.tournamentService.create(this.inscripcionForm).subscribe(data => {
            this.alertService.success('El campeonato se registró con éxito', true),
              console.log('el form', this.inscripcionForm);
          },
          error => {
            this.alertService.error(error.error.msg, false);
          }
        );
      }
    }
  }


}
