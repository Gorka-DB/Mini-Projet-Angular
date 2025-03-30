import { Injectable } from '@angular/core';
import { GAME } from '../models/game.models';
import {HttpClient} from '@angular/common/http';
import {Observable, switchMap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http: HttpClient) { }

  getGames() : Observable<GAME[]> {
    return this.http.get<GAME[]>("http://localhost:3000/GAME");
  }

  getGamesById(id: number) : Observable<GAME> {
    return this.http.get<GAME>("http://localhost:3000/GAME/" + id);
  }

  addGame(nouvJeu: GAME) : Observable<GAME> {
    return this.getGames().pipe(
      switchMap(games =>
        {
          let maxId = 0;
          games.forEach (game => { maxId = (game.id > maxId ? game.id : maxId); } );
          nouvJeu.id = maxId+1;
          return this.http.post<GAME>('http://localhost:3000/GAME', nouvJeu);
        }
      ));
  }

}
