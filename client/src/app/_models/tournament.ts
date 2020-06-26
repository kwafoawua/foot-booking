import {TState} from './TState';

export class Tournament {
  idTournament: string;
  creatorClubId: string;
  tournamentName: string;
  termsAndConditions: string;
  inscriptionStartDate: Date;
  inscriptionEndDate: Date;
  startDate: Date;
  endDate: Date;
  numbersOfTeams: number;
  inscriptionCost: number;
  publicationDescription: string;
  prize_1: string;
  prize_2: string;
  prize_3: string;
  tournamentType: string;
  category: string;
  state: TState;
 // tState: string;
  //image:File;
}
