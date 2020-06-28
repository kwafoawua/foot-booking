import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchService } from '../_services/index';
import { Club } from '../_models/club';
import { ClubService } from '../_services/index';
import { Observable ,  Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
// Observable class extensions

// Observable operators



import { ClubFilter } from '../_models/clubfilter';
import { Service } from '../_models/service';
import { Field } from '../_models/field';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-results',
  templateUrl: './result.component.html',
  providers: [ SearchService ],
})

export class ResultComponent implements OnInit {
  lat: number; // = -31.442217;
  lng: number; // = -64.193182;
  icon: '../../assets/icon/iconochico.png';
  zoom: number;
  public cantPlayerSelect: any[] = [
    { cant: 5, desc: '5 Jugadores' },
    { cant: 7, desc: '7 Jugadores' },
    { cant: 11, desc: '11 Jugadores' },
   ];
  private clubfilter: ClubFilter;
  public clubs: Club[];
  public services: Service[];
  private servicesChecked: Service [] = [];
  public radio: boolean; //true es club
  clubname = '';
  cantPlayers: any;
  minPrice: any;
  maxPrice: any;


  constructor(
    private activatedRoute: ActivatedRoute,
    private searchService: SearchService,
    private clubService: ClubService,
    private router: Router) {
  }


  ngOnInit(): void {
    this.setCurrentPosition();
    // TODO: poder obtener los clubs dependiendo de la url y los filtros que se aplican arriba
   // this.clubs = SearchService.clubs;
    this.clubService.getAll().subscribe((clubs: Club[]) => {
      if (clubs) {
        this.clubs = clubs;
      }
    });
    this.services = this.searchService.getClubServices();
  }


// LE PASO LOS DATOS PARA CREAR LOS FILTROS
  private crearFiltros(): ClubFilter {
    // let modelform = this.form.value;
    return new ClubFilter(
      this.clubname,
      this.servicesChecked,
      this.cantPlayers, this.maxPrice, this.minPrice
    );
  }

  // BUSCO POR NOMBRE

  buscarClubsPorNombre() {
    this.clubfilter = this.crearFiltros();
    console.log('ya cree el filtro', this.clubfilter);
    this.searchService.findClubsByFilters(this.clubfilter).subscribe(() => {
      this.clubs = SearchService.clubs;
    });
    console.log(this.clubfilter);
  }

  // BUSCO POR LOS FILTROS

  buscarClubsPorFiltros() {
    this.clubfilter = this.crearFiltros();
    console.log('ya cree el filtro', this.clubfilter);
    this.searchService.findClubsByMultipleFilter(this.clubfilter).subscribe(() => {
      this.clubs = SearchService.clubs;
    });
    console.log(this.clubfilter)
  }

  addService(e: any) {

    if (e.state) {
      console.log('agrego el servicio ', e.name)
      this.servicesChecked.push({ id: e.id, name: e.name });
      // console.log("array", this.servicesChecked)
    } else {
      console.log('saco el servicio', e.name);
      for (let i = 0; i < this.servicesChecked.length; i++) {
        if (this.servicesChecked[ i ].name === e.name) {
          this.servicesChecked.splice(i, 1);
          break;
        }
      }
    }
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 16;
      });
    }

  }
}
