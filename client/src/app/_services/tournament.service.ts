import { Tournament } from '../_models/tournament';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Club, Service, User} from '../_models';
import {NgForm} from '@angular/forms';
import * as moment from 'moment';
import {TState} from '../_models/TState';
import {Booking} from "../_models/booking";
import {Fase} from '../_models/fase';


@Injectable()

export class TournamentService {
/*
private myTournament: Tournament[] = [
  {
    idTournament: '1',
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
  { idTournament: '2',
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
  {idTournament: '3',
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
  {idTournament: '4',
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
  {idTournament: '5',
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
  {idTournament: '6',
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
  }];

// private theOnlyTournmanet: Tournament = {
//   idTournament: '1',
//   nameT: 'Mi capeonato 1',
//   description: 'string',
//   startInscription: new Date('07/19/2020'),
//   finishInscription: moment('19-07-2020', 'DD-MM-YYYY').toDate(),
//   statingDay: moment('19-07-2020', 'DD-MM-YYYY').toDate(),
//   finishDay: moment('19-07-2020', 'DD-MM-YYYY').toDate(),
//   cantequipos: 5,
//   inscriptionFee: 100,
//   publicationDescrip: 'descripcion',
//   prize_1: 'premio1',
//   prize_2: 'premio 2',
//   prize_3: 'prmio 3',
//   tournamentType:  '6 Jugadores',
//   state: {id: 2, name: 'Publicado'},
//   category: 'Mixto'
// };
*/

  private fasesTorneo: Fase[] = [
      {
        idTorneo: 'idtorneo',
       idfase: '1',
       nro_fase: 1,
       fecha_inicio: moment('19-07-2020', 'DD-MM-YYYY').toDate(),
       fecha_fin: moment('19-07-2020', 'DD-MM-YYYY').toDate(),
    equiposFase: [
          {
          nombreEquipo: 'Equipo de primera',
          idEquipo: '1'},
          {
            nombreEquipo: 'Equipo de segunda',
            idEquipo: '2'}
        ]
      },
    ];


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
  }];

  private tType: string[] = [
    '5 Jugadores',
    '7 Jugadores', '9 Jugadores', '11 Jugadores'];

  private categorias: string[] = ['Femenino', 'Masculino', 'Mixto'];

  constructor(private http: HttpClient) {
  }

  create(tournament: Tournament){
    console.log('El service ', tournament);
    return this.http.post('/tournament/register', tournament);
  }

  getTournamentType() {
    return this.tType;
  }

  getTournamentCategories(){
    return this.categorias;
  }

  getMyTournaments(_id: string){
  return this.http.get<Tournament[]>('/tournament/club/' + _id);
  console.log('este es el servicio');
   // return this.myTournament;
  }

  getTournamentInfo(_id: string){
    return this.http.get<Tournament>('/tournament/' + _id);
  }

  updateTournament(torneo: any) {
    return this.http.put('/tournament/' + torneo._id, torneo);
  }

  getFases() {
    return this.fasesTorneo; }


}
