import {Component, inject, OnInit} from '@angular/core';
import { GamesService } from '../services/games.service';
import { GAME } from '../models/game.models';

@Component({
  selector: 'app-list-game',
  standalone: false,
  templateUrl: './list-game.component.html',
  styleUrl: './list-game.component.scss'
})
export class ListGameComponent implements OnInit {
  listgame!: GAME[];
  // listeJeu: GAME[] = [];
  // GameService: GamesService = inject(GamesService);
  listeGameFiltree: GAME[] = [];

  constructor(private gamesService: GamesService) { }

  ngOnInit(): void {
    this.gamesService.getGames().subscribe((games) => {
      this.listgame = games;
      this.clearFiltres();
    });

  }

  filtrerJeux(text: string) {
    if (!text) {
      this.listeGameFiltree = this.listgame;
      return;
    }
    this.listeGameFiltree = this.listgame.filter((nom) =>
      nom?.titre.toLowerCase().includes(text.toLowerCase()),
    );
  }

  clearFiltres() {
    this.listeGameFiltree = this.listgame;
  }
}
