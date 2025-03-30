import {Component, Input, OnInit} from '@angular/core';
import { GAME } from '../models/game.models';
import {GamesService} from '../services/games.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: false,
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit{

  @Input() game!: GAME;
  theGame!: GAME;
  idgame!: string;

  constructor(private gameService: GamesService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.idgame = this.route.snapshot.params["id"];
    if (this.idgame !== undefined) {
      this.gameService.getGamesById(+this.idgame).subscribe(game => {
        this.theGame = game
      });
    } else {
      this.theGame = this.game;
    }
  }

}
