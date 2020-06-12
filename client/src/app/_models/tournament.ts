import {TState} from './TState';

export class Tournament {
  //_idClub: string;
  nameT: string;
  description: string;
  startInscription: Date;
  finishInscription: Date;
  statingDay: Date;
  finishDay: Date;
  cantequipos: number;
  inscriptionFee: number;
  publicationDescrip: string;
  prize_1: string;
  prize_2: string;
  prize_3: string;
  tournamentType: string;
  category: string;
  state: TState;
 // tState: string;
  //image:File;
}
