import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Player } from '../_models/player';

@Injectable()
export class PlayerService {
    constructor(private http: Http) { }

    create(player: Player) {
        console.log("El player ");
        return this.http.post('/players/register', player);
    }

    getAll() {
        return this.http.get('/players').map((response: Response) => response.json());
    }

    getById(_id: string) {
        return this.http.get('/players/' + _id).map((response: Response) => response.json());
    }

    update(player: Player) {
        return this.http.put('/players/' + player._id, player);
    }

    delete(_id: string) {
        return this.http.delete('/players/' + _id);
    }
}