import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ClubFilter} from '../_models/clubfilter';
import {Club} from '../_models';
import {environment} from '../../environments/environment';


@Component({
  templateUrl: './resultadoBusqueda.component.html',
  selector: 'rs-list',
})

export class ResultadoBusquedaComponent  {
  uploadsBaseURL = environment.uploadsBaseURL;
  @Input() clubsFound: Club[];
  constructor() {}
}
