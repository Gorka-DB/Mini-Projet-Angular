import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListGameComponent} from './list-game/list-game.component';
import {GameComponent} from './game/game.component';
import {NewReservationComponent} from './new-reservation/new-reservation.component';
import {ListReservationComponent} from './list-reservation/list-reservation.component';
import {ReservationComponent} from './reservation/reservation.component';

const routes: Routes = [
  {path: '', redirectTo: '/games', pathMatch: 'full'},
  {path: 'games', component: ListGameComponent},
  {path: 'games/:id', component: GameComponent},
  {path: 'new-reservation', component: NewReservationComponent},
  {path: 'reservations', component: ListReservationComponent},
  {path: 'reservations/:id', component: ReservationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
