import {Component, OnInit} from '@angular/core';
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
  listeGameFiltree: GAME[] = [];

  // filtres
  texteRecherche: string = '';
  filtrePlateforme: string = '';
  filtreGenre: string = '';
  filtreDeveloppeur: string = '';

  // listes pour filtres récupérés
  plateformes: string[] = [];
  genres: string[] = [];
  developpeurs: string[] = [];

  constructor(private gamesService: GamesService) { }

  ngOnInit(): void {
    this.gamesService.getGames().subscribe((games) => {
      this.listgame = games;
      this.recupOptionsFiltrage();
      this.enleverFiltres();
    });

  }

  // récup les filtres possibles pour remplir les 3 listes
  private recupOptionsFiltrage(): void {

    // récupération des valeurs -> qu'on met dans des Set pour supprimer les doublons
    const plateformesRecup = new Set(this.listgame.map(game => game.plateforme))
    const genresRecup = new Set(this.listgame.map(game => game.genre))
    const developpeursRecup = new Set(this.listgame.map(game => game.developpeur))

    // On les remet dans l'array qu'on utilise dans le template
    this.plateformes = [...plateformesRecup];
    this.genres = [...genresRecup];
    this.developpeurs = [...developpeursRecup];
  }

  // Appliquer les filtres
  appliquerFiltres(): void {
    this.listeGameFiltree = this.listgame.filter(game => {
      // recherche
      const matchAvecText = !this.texteRecherche || game.titre.toLowerCase().includes(this.texteRecherche.toLowerCase());
      // Plateforme
      const matchAvecPlateforme = !this.filtrePlateforme || game.plateforme === this.filtrePlateforme;
      // Genre
      const matchAvecGenre = !this.filtreGenre || game.genre === this.filtreGenre;
      // Dev
      const matchAvecDev = !this.filtreDeveloppeur || game.developpeur === this.filtreDeveloppeur;
      // renvoie vrai si toutes conditions ok et le filtrage s'est bien passé
      return matchAvecText && matchAvecPlateforme && matchAvecGenre && matchAvecDev;
    });
  }

  filtrerJeux(text: string) {
    this.texteRecherche = text;
    this.appliquerFiltres();
  }

  filtrerParPlateforme(plateforme: string) {
    this.filtrePlateforme = plateforme;
    this.appliquerFiltres();
  }

  filtrerParGenre(genre: string) {
    this.filtreGenre = genre;
    this.appliquerFiltres();
  }

  filtrerParDeveloppeur(developpeur: string) {
    this.filtreDeveloppeur = developpeur;
    this.appliquerFiltres();
  }

  enleverFiltres() {
    this.texteRecherche = '';
    this.filtrePlateforme = '';
    this.filtreGenre = '';
    this.filtreDeveloppeur = '';
    this.listeGameFiltree = this.listgame;
  }

}
