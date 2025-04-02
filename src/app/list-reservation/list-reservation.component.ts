import {Component, OnInit} from '@angular/core';
import {RESERVATION} from '../models/reservation.models';
import {ReservationsService} from '../services/reservation.service';
import {GamesService} from '../services/games.service';

@Component({
  selector: 'app-list-reservation',
  standalone: false,
  templateUrl: './list-reservation.component.html',
  styleUrl: './list-reservation.component.scss'
})
export class ListReservationComponent implements OnInit {
  listreservation! : RESERVATION[];

  constructor(private reservationService: ReservationsService) {  }
  ngOnInit(): void {
    this.reservationService.getReservations().subscribe((reservations) => {this.listreservation = reservations});
  }

}
