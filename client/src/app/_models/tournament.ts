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
  prize1: string;
  prize2: string;
  prize3: string;
  tournamentType: string;
  category: string;
  state: string;
  //image:File;
}
