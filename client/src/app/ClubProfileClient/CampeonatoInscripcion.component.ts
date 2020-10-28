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
  @Input() cantidad: any;
  inscripcionForm: FormGroup;
  isLinear: false;
  currentUser: any;
  public authenticated: boolean;
  name = '';
  rol = '';

  ngOnInit(): void {
    this.createForm();
  }

  constructor(private route: ActivatedRoute,
              private tournamentService: TournamentService,
              private fb: FormBuilder,
              private alertService: AlertService) {
            const user = JSON.parse(localStorage.getItem(('currentUser')));
            if (user) {
              this.currentUser = user;
              this.name = user.name;
              if (user.rol !== 'Club')
              {this.authenticated = true; }
              console.log('el user', user);
            }
  }


  createForm() {
    this.inscripcionForm = this.fb.group({
      idTournament: [''],
      idUser: [''],
      team: [null, [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
      name: [null, [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
      phoneNumber: [null, [Validators.required, Validators.maxLength(12), Validators.minLength(1)]],

    });
    this.inscripcionForm.controls.idTournament.setValue(this.route.snapshot.params.id) ;
    this.inscripcionForm.controls.idUser.setValue(this.currentUser);
  //  this.inscripcionForm.controls.idUser.setValue()
  }

  Inscribir() {
    console.log('ël form validado', this.inscripcionForm);
    if (this.inscripcionForm.valid) {
      console.log('ël form validado', this.inscripcionForm);
      {
        this.tournamentService.createInscription(this.inscripcionForm.value).subscribe(data => {
            this.alertService.success('La inscripción se registró con éxito', true),
              console.log('el form', this.inscripcionForm);
            console.log('informacion', this.torneo);
          },
          error => {
            this.alertService.error(error, false);
          }
        );

      }
      if (this.cantidad >= this.torneo.numbersOfTeams){
        this.torneo.state = 'Completo';
        this.tournamentService.updateTournament(this.torneo).subscribe(data => {
          this.alertService.success('Se actualizaron los datos exitosamente', true);
        }, error => {
          this.alertService.error(error.error.msg, false);
        });
      }
      this.createForm();

    }
    else { this.alertService.error('error al registrar la inscripción', this.inscripcionForm.value); }
  }



}
