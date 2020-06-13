import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { Player } from '../_models/player';

@Injectable()
export class PlayerService {
  constructor(private http: HttpClient) {
  }

  create(player: Player) {
    console.log('El player ');
    return this.http.post('/players/register', player);
  }

  getAll() {
    return this.http.get<Player[]>('/players');
  }

  getById(_id: string) {
    return this.http.get<Player>('/players/' + _id);
  }

  update(player: Player) {
    return this.http.put('/players/' + player._id, player);
  }

  delete(_id: string) {
    return this.http.delete('/players/' + _id);
  }

  getPlayerByUserId(_id: string) {
    return this.http.get<Player>('/players/' + _id);
  }
}
