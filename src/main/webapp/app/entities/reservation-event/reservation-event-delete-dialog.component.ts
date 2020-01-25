import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IReservationEvent } from 'app/shared/model/reservation-event.model';
import { ReservationEventService } from './reservation-event.service';

@Component({
  templateUrl: './reservation-event-delete-dialog.component.html'
})
export class ReservationEventDeleteDialogComponent {
  reservationEvent?: IReservationEvent;

  constructor(
    protected reservationEventService: ReservationEventService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.reservationEventService.delete(id).subscribe(() => {
      this.eventManager.broadcast('reservationEventListModification');
      this.activeModal.close();
    });
  }
}
