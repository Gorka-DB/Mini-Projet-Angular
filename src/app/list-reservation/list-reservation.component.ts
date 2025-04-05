import {Component, OnInit} from '@angular/core';
import {RESERVATION} from '../models/reservation.models';
import {ReservationsService} from '../services/reservation.service';

@Component({
  selector: 'app-list-reservation',
  standalone: false,
  templateUrl: './list-reservation.component.html',
  styleUrl: './list-reservation.component.scss'
})
export class ListReservationComponent implements OnInit {
  listreservation! : RESERVATION[];
  listeReservationFiltree: RESERVATION[] = [];

  // filtres
  texteRechercheNom: string = '';
  filtrePlateforme: string = '';
  filtreJeu: string = '';
  filtreStatut: string = '';

  // listes pour filtres récupérés
  plateformes: string[] = [];
  jeux: string[] = [];
  statuts: string[] = [];

  constructor(private reservationService: ReservationsService) {  }
  ngOnInit(): void {
    this.reservationService.getReservations().subscribe((res) =>
      {
      this.listreservation = res;
      this.recupOptionsFiltrage();
      this.enleverFiltres();
      }
    );

  }
  private recupOptionsFiltrage(): void {

    // récupération des valeurs -> on met dans des Set pour supprimer les doublons
    const plateformesRecup = new Set(this.listreservation.map(res => res.plateforme))
    const jeuxRecup = new Set(this.listreservation.map(res => res.jeuReserve))
    const statutsRecup = new Set(this.listreservation.map(res => res.statut))

    // On les remet dans l'array qu'on utilise dans le template
    this.plateformes = [...plateformesRecup];
    this.jeux = [...jeuxRecup];
    this.statuts = [...statutsRecup];
  }

  // Appliquer les filtres
  appliquerFiltres(): void {
    this.listeReservationFiltree = this.listreservation.filter(res => {
      // recherche par nom de personne qui a fait la res
      const matchAvecNom = !this.texteRechercheNom || res.nom.toLowerCase().includes(this.texteRechercheNom.toLowerCase());
      // Plateforme
      const matchAvecPlateforme = !this.filtrePlateforme || res.plateforme === this.filtrePlateforme;
      // Jeu
      const matchAvecJeu = !this.filtreJeu || res.jeuReserve === this.filtreJeu;
      // Statut
      const matchAvecStatut = !this.filtreStatut || res.statut === this.filtreStatut;
      // renvoie vrai si toutes conditions ok et le filtrage s'est bien passé
      return matchAvecNom && matchAvecPlateforme && matchAvecJeu && matchAvecStatut;
    });
  }

  filtrerReservations(text: string) {
    this.texteRechercheNom = text;
    this.appliquerFiltres();
  }

  // filtrerParPlateforme(plateforme: string) {
  //   this.filtrePlateforme = plateforme;
  //   this.appliquerFiltres();
  // }

  // filtrerParJeu(jeu: string) {
  //   this.filtreJeu = jeu;
  //   this.appliquerFiltres();
  // }

  // filtrerParStatut(statut: string) {
  //   this.filtreStatut = statut;
  //   this.appliquerFiltres();
  // }

  enleverFiltres() {
    this.texteRechercheNom = '';
    this.filtrePlateforme = '';
    this.filtreJeu = '';
    this.filtreStatut = '';
    this.listeReservationFiltree = this.listreservation;
  }
}
