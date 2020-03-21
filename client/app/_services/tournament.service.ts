import {Tournament} from "../_models/tournament";
import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
/**
 * Created by pablo on 25/11/2017.
 */

@Injectable()

export class TournamentService {

    constructor(private http: Http) { }

    create(tournament: any) {
        console.log("El service ", tournament);
        return this.http.post('/tournament/register', tournament);
    }

}