import * as moment from 'moment';
import _date = moment.unitOfTime._date;
import { Field } from './field';
import { Player } from './player';
import { Club } from './club';

export class Booking {
  date: any;
  field: Field;
  club: Club;
  dateBook: string;
  timeBook: string;
  playingTime: string;
  status: string;
  playingDate: string;
  //state: any;
  player: Player;
  // fee: number;
}
