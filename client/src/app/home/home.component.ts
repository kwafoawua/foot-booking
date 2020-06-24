import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { SearchService } from '../_services/index';
import { Router } from '@angular/router';
import { ClubFilter } from '../_models/clubfilter';
import { IDatePickerDirectiveConfig } from 'ng2-date-picker';
import { Moment } from 'moment';
import { ITimeSelectConfig } from 'ng2-date-picker/time-select/time-select-config.model';


@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  homeForm;
  private clubfilter: ClubFilter;

  lat: number;
  lng: number;
  icon: '../../assets/icon/iconochico.png';
  zoom = 16.88;
  clubname = '';
  selectedDate: any;
  selectedTime: any;
  configTime: ITimeSelectConfig = {
    minutesInterval: 60,
    minutesFormat: '00'
  };
  config: IDatePickerDirectiveConfig = {
    format: 'DD/MM/YYYY',
    enableMonthSelector: true,
    showNearMonthDays: false,
    monthFormatter: (m: Moment): string => {
      return [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun',
          'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ][ m.month() ] +
        ', ' + m.year();
    },
    appendTo: 'body'
  };

  constructor(
    private searchService: SearchService,
    private router: Router,
    private formBuilder: FormBuilder,
    ) {
    this.homeForm = this.formBuilder.group({
      clubName: '',
      date: '',
    });
  }

 ngOnInit() {

  }

  buscarClub() {
    this.buscarClubsPorFiltros();
  }

  //BUSCO POR LOS FILTROS
  private buscarClubsPorFiltros() {
    this.clubfilter = this.crearFiltros();
    this.searchService.findClubsByFilters(this.clubfilter)
      .subscribe((a) => {
        console.log('resultado', a);
        this.router.navigate([ 'results' ]);
      });
  }

  //LE PASO LOS DATOS PARA CREAR LOS FILTROS
  private crearFiltros(): ClubFilter {
    return new ClubFilter( this.homeForm.get('clubName').value );
  }

}
