import { Tournament } from '../_models/tournament';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Service} from '../_models';
import {NgForm} from '@angular/forms';
import * as moment from 'moment';
import {TState} from "../_models/TState";


@Injectable()

export class TournamentService {

private myTournament: Tournament[] = [
  {
  nameT: 'Mi capeonato 1',
  description: 'string',
  startInscription: new Date('07/19/2020'),
  finishInscription: moment('19-07-2020', 'DD-MM-YYYY').toDate(),
  statingDay: moment('19-07-2020', 'DD-MM-YYYY').toDate(),
  finishDay: moment('19-07-2020', 'DD-MM-YYYY').toDate(),
  cantequipos: 5,
  inscriptionFee: 100,
  publicationDescrip: 'descripcion',
  prize_1: 'premio1',
  prize_2: 'premio 2',
  prize_3: 'prmio 3',
  tournamentType:  '6 Jugadores',
  state: {id: 2, name: 'Publicado'},
  category: 'Mixto'
},
  {
    nameT: 'Mi capeonato 2',
    description: 'string',
    startInscription: new Date('07/19/2020'),
    finishInscription: moment('19-07-2020', 'DD-MM-YYYY').toDate(),
    statingDay: moment('19-07-2020', 'DD-MM-YYYY').toDate(),
    finishDay: moment('19-07-2020', 'DD-MM-YYYY').toDate(),
    cantequipos: 5,
    inscriptionFee: 100,
    publicationDescrip: 'descripcion',
    prize_1: 'premio1',
    prize_2: 'premio 2',
    prize_3: 'prmio 3',
    tournamentType:  '6 Jugadores',
    state: {id: 1, name: 'Nuevo'},
    category: 'Mixto'
  },
  {
    nameT: 'Mi capeonato 3',
    description: 'string',
    startInscription: new Date('07/19/2020'),
    finishInscription: moment('19-07-2020', 'DD-MM-YYYY').toDate(),
    statingDay: moment('19-07-2020', 'DD-MM-YYYY').toDate(),
    finishDay: moment('19-07-2020', 'DD-MM-YYYY').toDate(),
    cantequipos: 5,
    inscriptionFee: 100,
    publicationDescrip: 'descripcion',
    prize_1: 'premio1',
    prize_2: 'premio 2',
    prize_3: 'prmio 3',
    tournamentType:  '6 Jugadores',
    state: {id: 1, name: 'Nuevo'},
    category: 'Mixto'
  },
  {
    nameT: 'Mi capeonato 4',
    description: 'string',
    startInscription: new Date('07/19/2020'),
    finishInscription: moment('19-07-2020', 'DD-MM-YYYY').toDate(),
    statingDay: moment('19-07-2020', 'DD-MM-YYYY').toDate(),
    finishDay: moment('19-07-2020', 'DD-MM-YYYY').toDate(),
    cantequipos: 5,
    inscriptionFee: 100,
    publicationDescrip: 'descripcion',
    prize_1: 'premio1',
    prize_2: 'premio 2',
    prize_3: 'prmio 3',
    tournamentType:  '6 Jugadores',
    state: {id: 1, name: 'Nuevo'},
    category: 'Mixto'
  },
  {
    nameT: 'Mi capeonato 5',
    description: 'string',
    startInscription: new Date('07/19/2020'),
    finishInscription: moment('19-07-2020', 'DD-MM-YYYY').toDate(),
    statingDay: moment('19-07-2020', 'DD-MM-YYYY').toDate(),
    finishDay: moment('19-07-2020', 'DD-MM-YYYY').toDate(),
    cantequipos: 5,
    inscriptionFee: 100,
    publicationDescrip: 'descripcion',
    prize_1: 'premio1',
    prize_2: 'premio 2',
    prize_3: 'prmio 3',
    tournamentType:  '6 Jugadores',
    state: {id: 1, name: 'Nuevo'},
    category: 'Mixto'
  },
  {
    nameT: 'Mi capeonato 6',
    description: 'string',
    startInscription: new Date('07/19/2020'),
    finishInscription: moment('19-07-2020', 'DD-MM-YYYY').toDate(),
    statingDay: moment('19-07-2020', 'DD-MM-YYYY').toDate(),
    finishDay: moment('19-07-2020', 'DD-MM-YYYY').toDate(),
    cantequipos: 5,
    inscriptionFee: 100,
    publicationDescrip: 'descripcion',
    prize_1: 'premio1',
    prize_2: 'premio 2',
    prize_3: 'prmio 3',
    tournamentType:  '6 Jugadores',
    state: {id: 1, name: 'Nuevo'},
    category: 'Mixto'
  }]

private tState: TState[] = [
  {
  id: 1,
  name: 'Nuevo'
},
  {id: 2,
  name: 'Publicado'
  },
  {id: 3,
  name: 'Iniciado'
  },
  {id: 4,
  name: 'Finalizado'
  },
  {id: 5,
    name: 'Cancelado'
  }]

  private tType: string[] = [
    '5 Jugadores', '6 Jugadores',
    '7 Jugadores', '9 Jugadores', '11 Jugadores'];

  private categorias: string[] = ['Femenino', 'Masculino', 'Mixto'];

  constructor(private http: HttpClient) {
  }

  create(tournament: NgForm){
    console.log('El service ', tournament);
    return this.http.post('/tournament/register', tournament);
  }

  getTournamentType() {
    return this.tType;
  }

  getTournamentCategories(){
    return this.categorias;
  }

  getMyTournaments(){
    return this.myTournament;
  }


}
