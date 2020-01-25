import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IReservationEvent, ReservationEvent } from 'app/shared/model/reservation-event.model';
import { ReservationEventService } from './reservation-event.service';
import { ReservationEventComponent } from './reservation-event.component';
import { ReservationEventDetailComponent } from './reservation-event-detail.component';
import { ReservationEventUpdateComponent } from './reservation-event-update.component';

@Injectable({ providedIn: 'root' })
export class ReservationEventResolve implements Resolve<IReservationEvent> {
  constructor(private service: ReservationEventService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IReservationEvent> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((reservationEvent: HttpResponse<ReservationEvent>) => {
          if (reservationEvent.body) {
            return of(reservationEvent.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ReservationEvent());
  }
}

export const reservationEventRoute: Routes = [
  {
    path: '',
    component: ReservationEventComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'devApp.reservationEvent.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ReservationEventDetailComponent,
    resolve: {
      reservationEvent: ReservationEventResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'devApp.reservationEvent.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ReservationEventUpdateComponent,
    resolve: {
      reservationEvent: ReservationEventResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'devApp.reservationEvent.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ReservationEventUpdateComponent,
    resolve: {
      reservationEvent: ReservationEventResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'devApp.reservationEvent.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
