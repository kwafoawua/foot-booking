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


  ngOnInit(): void {
    this.getTorneo(this.route.snapshot.params.id);
  }

  constructor(private route: ActivatedRoute,
              private tournamentService: TournamentService,
              ) {
  }

  getTorneo(torneoId: string) {
    this.tournamentService.getTournamentInfo(torneoId).subscribe((data: any) => {
      this.torneo = data.tournament;
      console.log('los datos ' + this.torneo.valueOf());
    }, error => console.log(error));

  }

}
