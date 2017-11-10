import * as moment from "moment";
import _date = moment.unitOfTime._date;
import {Field} from "./field";
import {Player} from "./player";
import {Club} from "./club";
/**
 * Created by pablo on 10/10/2017.
 */

export class Booking{

    date: any;
    field : Field;
    club : Club;
    dateBook: any;
    timeBook: any;
  //state: any;
    player: Player;
}