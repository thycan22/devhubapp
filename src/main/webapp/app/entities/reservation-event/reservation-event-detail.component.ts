import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IReservationEvent } from 'app/shared/model/reservation-event.model';

@Component({
  selector: 'jhi-reservation-event-detail',
  templateUrl: './reservation-event-detail.component.html'
})
export class ReservationEventDetailComponent implements OnInit {
  reservationEvent: IReservationEvent | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reservationEvent }) => {
      this.reservationEvent = reservationEvent;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
