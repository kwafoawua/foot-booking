import { Component, OnInit } from '@angular/core';
import { SearchService } from '../_services/index';
import { Router } from '@angular/router';
import { ClubFilter } from '../_models/clubfilter';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  private clubfilter: ClubFilter;

  lat: number;
  lng: number;
  icon: '../../assets/icon/iconochico.png';
  zoom = 16.88;
  clubname = '';
  selectedCampOrPlay = '¿Qué vas a jugar?';
  selectedCantJugadores = 'Jugadores';
  selectedTipoCancha = 'Tipo de cancha';
  filters = {} as any;

  constructor(
    private searchService: SearchService,
    private router: Router,
    ) {}

 ngOnInit() {

  }

  buscarClub() {
    if (this.clubname) {
      this.filters['clubname'] = this.clubname;
    }
    this.router.navigate(['results'], {queryParams: this.filters});
  }

  handleCampOrPlay(option: string, value: boolean) {
    this.selectedCampOrPlay = option;
    if (value) {
      this.filters['tournament'] = value;
    } else {
      delete this.filters['tournament'];
    }
  }
  handleCantJugadores(option: string, value: number) {
    this.selectedCantJugadores = option;
    if (value) {
      this.filters['cantPlayers'] = value;
    }
    else {
      delete this.filters['cantPlayers'];
    }
  }

  handleTipoCancha(option: string, value) {
    this.selectedTipoCancha = option;
    if (value) {
      this.filters['fieldType'] = value;
    }
    else {
      delete this.filters['fieldType'];
    }
  }
}
