import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IReservationEvent } from 'app/shared/model/reservation-event.model';
import { ReservationEventService } from './reservation-event.service';
import { ReservationEventDeleteDialogComponent } from './reservation-event-delete-dialog.component';

@Component({
  selector: 'jhi-reservation-event',
  templateUrl: './reservation-event.component.html'
})
export class ReservationEventComponent implements OnInit, OnDestroy {
  reservationEvents?: IReservationEvent[];
  eventSubscriber?: Subscription;

  constructor(
    protected reservationEventService: ReservationEventService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.reservationEventService.query().subscribe((res: HttpResponse<IReservationEvent[]>) => {
      this.reservationEvents = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInReservationEvents();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IReservationEvent): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInReservationEvents(): void {
    this.eventSubscriber = this.eventManager.subscribe('reservationEventListModification', () => this.loadAll());
  }

  delete(reservationEvent: IReservationEvent): void {
    const modalRef = this.modalService.open(ReservationEventDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.reservationEvent = reservationEvent;
  }
}
