import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DevAppSharedModule } from 'app/shared/shared.module';
import { ReservationEventComponent } from './reservation-event.component';
import { ReservationEventDetailComponent } from './reservation-event-detail.component';
import { ReservationEventUpdateComponent } from './reservation-event-update.component';
import { ReservationEventDeleteDialogComponent } from './reservation-event-delete-dialog.component';
import { reservationEventRoute } from './reservation-event.route';

@NgModule({
  imports: [DevAppSharedModule, RouterModule.forChild(reservationEventRoute)],
  declarations: [
    ReservationEventComponent,
    ReservationEventDetailComponent,
    ReservationEventUpdateComponent,
    ReservationEventDeleteDialogComponent
  ],
  entryComponents: [ReservationEventDeleteDialogComponent]
})
export class DevAppReservationEventModule {}
