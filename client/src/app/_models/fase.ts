import {Equipo} from "./equipo";

export class Fase {
  idTorneo: string;
  idfase: string;
  nro_fase: number;
  fecha_inicio: Date;
  fecha_fin: Date;
 // partido: any[];
  equiposFase: Equipo[];
}
