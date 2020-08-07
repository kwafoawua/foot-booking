import {Equipo} from './equipo';
import {Game} from './game';

export class Fase {
  idTorneo: string;
  idfase: string;
  nro_fase: number;
  fecha_inicio: Date;
  fecha_fin: Date;
  equiposFase: Equipo[];
  games: Game[];
}
