import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TournamentService} from '../_services/tournament.service';
import {Tournament} from '../_models/tournament';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../_services';
import {MatStepperModule} from '@angular/material/stepper';
import {Equipo} from '../_models/equipo';


@Component({
  templateUrl: './CampeonatoInfo.component.html'
})

export class CampeonatoInfoComponent implements OnInit {
  torneo: Tournament;
  inscriptions: any[];
  cantidad: any;
  currentUser: any;
  name = '';
  rol = '';
  yaRegistrado: boolean;
  NotanUser = false;
  permiteReserva: boolean;
  primerEquipo: string;
  segundoEquipo: string;
  tercerEquipo: string;
  fechaInscripcionValida: boolean;

  ngOnInit(): void {
    this.getTorneo(this.route.snapshot.params.id);
    this.getInscriptions();
  }

  constructor(private route: ActivatedRoute,
              private tournamentService: TournamentService,
              ) {
        const user = JSON.parse(localStorage.getItem(('currentUser')));

        if (user != null) {
            if (user.rol !== 'Club')
            {this.rol = 'Jugador'; }
          } else {
            this.permiteReserva = false;
            this.NotanUser = true;
          }
  }

  getTorneo(torneoId: string) {
    this.tournamentService.getTournamentInfo(torneoId).subscribe((data: any) => {
      this.torneo = data.tournament;
      console.log('los datos ' + JSON.stringify(data));
      this.isInscriptionDateAllowed();
    }, error => console.log(error));

  }

  getInscriptions() {
    this.tournamentService.getAllInscriptions(this.route.snapshot.params.id).subscribe((data: any) => {
      const userId = JSON.parse(localStorage.getItem(('currentUser')))._id;
      this.inscriptions = data.inscriptions;
      this.cantidad = this.inscriptions.length;
      this.yaRegistrado = data.inscriptions.some(i => i.userId === userId);
      console.log(this.yaRegistrado);
      console.log('cantidad', this.cantidad);
    });
  }

  setWinners($event) {
    if ($event) {
      this.primerEquipo = $event.primerEquipo;
      this.segundoEquipo = $event.segundoEquipo;
      this.tercerEquipo = $event.tercerEquipo;
    }
  }

  isInscriptionDateAllowed() {
    const today = new Date();
    const inscriptionStartDate = new Date(this.torneo.inscriptionStartDate);
    const inscriptionEndDate = new Date(this.torneo.inscriptionEndDate);
    this.fechaInscripcionValida = inscriptionStartDate <= today && inscriptionEndDate > today;
  }

}
