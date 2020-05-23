import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ClubFilter} from '../_models/clubfilter';
import {Club} from '../_models';
import {environment} from '../../environments/environment';


@Component({
  templateUrl: './resultadoBusqueda.component.html',
  selector: 'rs-list',
})

export class ResultadoBusquedaComponent  {

 public _clubsEncontrados: Club[];
  uploadsBaseURL = environment.uploadsBaseURL;
  get clubsFound(): Club[]{
   return this._clubsEncontrados;
  }
  @Input()
  set clubsFound(value: Club[]){
    this._clubsEncontrados = value;
    console.log(this.clubsFound);
  }

  constructor() {
  }


}
