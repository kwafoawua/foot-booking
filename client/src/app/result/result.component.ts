import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PaginationService, SearchService } from '../_services/index';
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
import { PaginationResponse } from '../_models/pagination';

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
  public radio: boolean; // true es club
  clubname: string;
  cantPlayers: any;
  minPrice: any;
  maxPrice: any;
  fieldType: any;
  public fieldTypesSelect: string[] = [ 'Cesped', 'Sintético', 'Tierra' ];
  pagination: PaginationResponse;
  page = 1;
  count = 0;
  pageSize = 9;
  pageSizes = [9, 15, 21];
  hasTournament = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private searchService: SearchService,
    private clubService: ClubService,
    private router: Router,
    private paginationService: PaginationService
  ) {
  }


  ngOnInit(): void {
    this.setCurrentPosition();
    this.services = this.searchService.getClubServices();

    this.activatedRoute.queryParams.subscribe(params => {
      const pagParams = this.paginationService.getRequestParams(this.page, this.pageSize);

      this.clubname = params.clubname || null;
      this.servicesChecked = params.services ? JSON.parse(params.services) : [];
      this.cantPlayers = params.cantPlayers || null;
      this.maxPrice = params.maxPrice || null;
      this.minPrice = params.minPrice || null;
      this.fieldType = params.fieldType || null;
      this.hasTournament = params.hasTournament === 'true';
      this.clubfilter = this.crearFiltros();
      this.searchService.findClubsByMultipleFilter(this.clubfilter, pagParams).subscribe((paginatedClub: any) => {
          const {clubs, totalItems } = paginatedClub;
          this.clubs = clubs;
          this.count = totalItems;
        });
    });
  }


// LE PASO LOS DATOS PARA CREAR LOS FILTROS
  private crearFiltros(): ClubFilter {
    // let modelform = this.form.value;
    const newClubFilter = new ClubFilter(
      this.clubname,
      this.servicesChecked,
      this.cantPlayers,
      this.maxPrice,
      this.minPrice,
      this.fieldType,
      this.hasTournament,
    );
    return newClubFilter;
  }

  // BUSCO POR LOS FILTROS

  buscarClubsPorFiltros() {
    this.clubfilter = this.crearFiltros();
    const newFilter: any = this.clubfilter;
    if (this.clubfilter.services) {
      newFilter.services = JSON.stringify(this.clubfilter.services);
    }
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: newFilter,
      });
  }

  addService(e: any) {

    if (e.state) {
      console.log('agrego el servicio ', e.name);
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
    console.log(this.servicesChecked);
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

  handlePageChange(event) {
    this.page = event;
    const params = this.paginationService.getRequestParams(this.page, this.pageSize);
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: params,
        queryParamsHandling: 'merge'
      });

  }

  handlePageSizeChange(event) {
    this.pageSize = event.value;
    this.page = 1;
    const params = this.paginationService.getRequestParams(this.page, this.pageSize);
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: params,
        queryParamsHandling: 'merge'
      });

  }
}
