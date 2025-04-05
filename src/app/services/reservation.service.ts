import { Injectable } from '@angular/core';
import { RESERVATION } from '../models/reservation.models';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  constructor(private http: HttpClient) {}

  getReservations(): Observable<RESERVATION[]> {
    return this.http.get<RESERVATION[]>("http://localhost:3000/RESERVATION");
  }

  getReservationById(id: number): Observable<RESERVATION> {
    return this.http.get<RESERVATION>("http://localhost:3000/RESERVATION/" + id);
  }

  getReservationsByGame(jeuReserve: string): Observable<RESERVATION[]> {
    return this.http.get<RESERVATION[]>(`http://localhost:3000/RESERVATION?jeuReserve=${jeuReserve}`);
  }

  addReservation(nouvReservation: RESERVATION): Observable<RESERVATION> {
    return this.getReservations().pipe(
      switchMap(reservations => { //afin de déterminer un id unique pas déjà utilisé
        let maxId = 0;
        reservations.forEach(reservation => {
          maxId = (reservation.id > maxId ? reservation.id : maxId);
        });
        nouvReservation.id = maxId + 1;

        // Mettre à jour le stock de jeu quand la réservation est confirmée ??? -> TODO: demander à carpentier
        // if (nouvReservation.statut === 'Confirmée') {
        //   this.gamesService.updateGameStock(nouvReservation.titreJeu, -1).subscribe();
        // }

        return this.http.post<RESERVATION>('http://localhost:3000/RESERVATION', nouvReservation);
      })
    );
  }


  // PAS UTILE ? -> on change juste le statut -> TODO: Demander à carpentier
  // deleteReservation(id: number): Observable<any> {
  //   return this.getReservationById(id).pipe(
  //     switchMap(reservation => {
  //       // Si la réservation est était confirmée avant, mettre à jour le stock de jeu ????? -> TODO: A demander
  //       // if (reservation.statut === 'Confirmée') {
  //       //   this.gamesService.updateGameStock(reservation.titreJeu, 1).subscribe();
  //       // }
  //
  //       return this.http.delete(`http://localhost:3000/RESERVATION/${id}`);
  //     })
  //   );
  // }
}
