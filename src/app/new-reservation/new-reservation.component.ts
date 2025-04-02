import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { GamesService } from '../services/games.service';
import {Router} from '@angular/router';
import {RESERVATION} from '../models/reservation.models';
import {ReservationsService} from '../services/reservation.service';
import {GAME} from '../models/game.models';

@Component({
  selector: 'app-new-game',
  standalone: false,
  templateUrl: './new-reservation.component.html',
  styleUrl: './new-reservation.component.scss'
})
export class NewReservationComponent implements OnInit {

  formulaire!: FormGroup;
  currentReservation!: RESERVATION;
  games: GAME[] = [];

  //TODO: Implémenter une façon de réduire le stock lors de la création d'une réservation
  //TODO: Eventuellement faire en sorte de conditionner les plateformes, les afficher que si disponible


  private telRegex: RegExp | undefined;
  plateformes: string[] = ['PC', 'PlayStation', 'Xbox', 'Switch', 'Autre'];
  statuts: string[] = ['confirmee', 'en attente', 'annulee'];

  constructor(private formBuilder: FormBuilder,
              private reservationService: ReservationsService,
              private router: Router,
              private gamesService: GamesService) {}

  ngOnInit(): void {
    this.telRegex = new RegExp("^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$");

    this.gamesService.getGames().subscribe({
        next: (games) => {
          this.games = games;
        },
        error: (err) => {
          console.error('Erreur...', err);
        }
      });

    this.formulaire = this.formBuilder.group({
        nom: [null, [Validators.required, Validators.minLength(2)]],
        email: [null, [Validators.required, Validators.email]],
        tel: [null, [Validators.required, Validators.pattern(this.telRegex)]],
        jeuReserve: [null, [Validators.required]],
        plateforme: [null, [Validators.required]],
        date: [new Date(), [Validators.required]],
        statut: ['confirmee', [Validators.required]],
      },
      {updateOn: 'blur'}
    );

    this.formulaire.valueChanges.subscribe((formValue) => {
      this.currentReservation = {
        id: 0,
        nom: formValue.nom,
        email: formValue.email,
        tel: formValue.tel,
        jeuReserve: formValue.jeuReserve,
        plateforme: formValue.plateforme,
        date: formValue.date,
        statut: formValue.statut
      };
    });
  }

  ajoutReservation() {
    if (this.formulaire.valid) {
      let newReservation: RESERVATION = {
        id: 0,
        nom: this.formulaire.get('nom')?.value,
        email: this.formulaire.get('email')?.value,
        tel: this.formulaire.get('tel')?.value,
        jeuReserve: this.formulaire.get('jeuReserve')?.value,
        plateforme: this.formulaire.get('plateforme')?.value,
        date: this.formulaire.get('date')?.value,
        statut: this.formulaire.get('statut')?.value
      }

      this.reservationService.addReservation(newReservation).subscribe({
        next: reservation => {
          alert('Réservation ajoutée avec succès!');
          this.router.navigateByUrl('/reservations');
        },
        error: err => {
          //console.error('Erreur lors de l\'ajout de la réservation:', err);
          alert('Une erreur est survenue lors de l\'ajout de la réservation');
        }
      });
    } else {
      // Marquer tous les champs comme touchés pour afficher les erreurs
      Object.keys(this.formulaire.controls).forEach(cle => {
        this.formulaire.get(cle)?.markAsTouched();
      });
      alert('Corrigez les erreurs dans le formulaire');
    }
  }


}
