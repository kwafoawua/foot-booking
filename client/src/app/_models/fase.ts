import {Equipo} from './equipo';
import {Game} from './game';

export class Fase {
  idTorneo: string;
  idfase: string;
  nro_fase: number;
  fecha_inicio: Date; // sacar
  fecha_fin: Date; // sacar
  equiposFase: Equipo[]; //sacarlo.
  games: Game[];
}
