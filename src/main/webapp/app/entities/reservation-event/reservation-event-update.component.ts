import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { IReservationEvent, ReservationEvent } from 'app/shared/model/reservation-event.model';
import { ReservationEventService } from './reservation-event.service';
import { IResource } from 'app/shared/model/resource.model';
import { ResourceService } from 'app/entities/resource/resource.service';
import { IPrice } from 'app/shared/model/price.model';
import { PriceService } from 'app/entities/price/price.service';
import { ICustomer } from 'app/shared/model/customer.model';
import { CustomerService } from 'app/entities/customer/customer.service';

type SelectableEntity = IResource | IPrice | ICustomer;

@Component({
  selector: 'jhi-reservation-event-update',
  templateUrl: './reservation-event-update.component.html'
})
export class ReservationEventUpdateComponent implements OnInit {
  isSaving = false;

  resources: IResource[] = [];

  prices: IPrice[] = [];

  customers: ICustomer[] = [];
  startDp: any;
  endDp: any;

  editForm = this.fb.group({
    id: [],
    start: [null, [Validators.required]],
    end: [null, [Validators.required]],
    text: [],
    nbDay: [],
    nbAdult: [null, [Validators.required]],
    nbChild: [],
    resource: [],
    price: [],
    customer: []
  });

  constructor(
    protected reservationEventService: ReservationEventService,
    protected resourceService: ResourceService,
    protected priceService: PriceService,
    protected customerService: CustomerService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reservationEvent }) => {
      this.updateForm(reservationEvent);

      this.resourceService
        .query()
        .pipe(
          map((res: HttpResponse<IResource[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IResource[]) => (this.resources = resBody));

      this.priceService
        .query()
        .pipe(
          map((res: HttpResponse<IPrice[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IPrice[]) => (this.prices = resBody));

      this.customerService
        .query()
        .pipe(
          map((res: HttpResponse<ICustomer[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ICustomer[]) => (this.customers = resBody));
    });
  }

  updateForm(reservationEvent: IReservationEvent): void {
    this.editForm.patchValue({
      id: reservationEvent.id,
      start: reservationEvent.start,
      end: reservationEvent.end,
      text: reservationEvent.text,
      nbDay: reservationEvent.nbDay,
      nbAdult: reservationEvent.nbAdult,
      nbChild: reservationEvent.nbChild,
      resource: reservationEvent.resource,
      price: reservationEvent.price,
      customer: reservationEvent.customer
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const reservationEvent = this.createFromForm();
    if (reservationEvent.id !== undefined) {
      this.subscribeToSaveResponse(this.reservationEventService.update(reservationEvent));
    } else {
      this.subscribeToSaveResponse(this.reservationEventService.create(reservationEvent));
    }
  }

  private createFromForm(): IReservationEvent {
    return {
      ...new ReservationEvent(),
      id: this.editForm.get(['id'])!.value,
      start: this.editForm.get(['start'])!.value,
      end: this.editForm.get(['end'])!.value,
      text: this.editForm.get(['text'])!.value,
      nbDay: this.editForm.get(['nbDay'])!.value,
      nbAdult: this.editForm.get(['nbAdult'])!.value,
      nbChild: this.editForm.get(['nbChild'])!.value,
      resource: this.editForm.get(['resource'])!.value,
      price: this.editForm.get(['price'])!.value,
      customer: this.editForm.get(['customer'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReservationEvent>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
