import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ClubFilter} from '../_models/clubfilter';
import {Club} from '../_models';
import {environment} from '../../environments/environment';


@Component({
  templateUrl: './resultadoBusqueda.component.html',
  selector: 'rs-list',
})


export class ResultadoBusquedaComponent implements OnInit{

  public collectionSize: number;
  pageSize = 10;
  page = 1;
  uploadsBaseURL = environment.uploadsBaseURL;
  @Input() clubsFound: Club[];



  constructor() {
  }
  ngOnInit(): void {
    this.collectionSize = this.clubsFound.length;
  }

}
