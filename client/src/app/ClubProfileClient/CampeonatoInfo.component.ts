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

  ngOnInit(): void {
    this.getTorneo(this.route.snapshot.params.id);
    this.getInscriptions();
  }

  constructor(private route: ActivatedRoute,
              private tournamentService: TournamentService,
              ) {
        const user = JSON.parse(localStorage.getItem(('currentUser')));
        if (user) {
          this.currentUser = user;
          this.name = user.name;
          if (user.rol !== 'Club')
          {this.rol = 'Jugador'; }
          console.log('el user', this.rol);
        }
  }

  getTorneo(torneoId: string) {
    this.tournamentService.getTournamentInfo(torneoId).subscribe((data: any) => {
      this.torneo = data.tournament;
      console.log('los datos ' + JSON.stringify(data));
    }, error => console.log(error));

  }

  getInscriptions() {
    this.tournamentService.getAllInscriptions(this.route.snapshot.params.id).subscribe((data: any) => {
      this.inscriptions = data.inscriptions;
      this.cantidad = this.inscriptions.length;
      console.log('cantidad', this.cantidad);
    });
  }

}
