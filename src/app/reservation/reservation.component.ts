import {Component, Input, OnInit} from '@angular/core';
import {RESERVATION} from '../models/reservation.models';
import {ReservationsService} from '../services/reservation.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-reservation',
  standalone: false,
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent implements OnInit {

  @Input() reservation !: RESERVATION;
  theReservation !: RESERVATION;
  idreservation !: string;

  constructor(private reservationService: ReservationsService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.idreservation = this.route.snapshot.params["id"];
    if (this.idreservation !== undefined) {
      this.reservationService.getReservationById(+this.idreservation).subscribe(reservation => {
        this.theReservation = reservation
      });
    } else {
      this.theReservation = this.reservation;
    }
  }

}
