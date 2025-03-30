import { Component, OnInit } from '@angular/core';
import { GamesService } from '../services/games.service';
import { GAME } from '../models/game.models';
@Component({
  selector: 'app-list-game',
  standalone: false,
  templateUrl: './list-game.component.html',
  styleUrl: './list-game.component.scss'
})
export class ListGameComponent implements OnInit{
  listgame! : GAME[];

  constructor(private gamesService: GamesService) {  }
  ngOnInit(): void {
    this.gamesService.getGames().subscribe((games) => {this.listgame = games});
  }
}
