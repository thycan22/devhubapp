import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'resource',
        loadChildren: () => import('./resource/resource.module').then(m => m.DevAppResourceModule)
      },
      {
        path: 'room-type',
        loadChildren: () => import('./room-type/room-type.module').then(m => m.DevAppRoomTypeModule)
      },
      {
        path: 'reservation-event',
        loadChildren: () => import('./reservation-event/reservation-event.module').then(m => m.DevAppReservationEventModule)
      },
      {
        path: 'country',
        loadChildren: () => import('./country/country.module').then(m => m.DevAppCountryModule)
      },
      {
        path: 'price',
        loadChildren: () => import('./price/price.module').then(m => m.DevAppPriceModule)
      },
      {
        path: 'customer',
        loadChildren: () => import('./customer/customer.module').then(m => m.DevAppCustomerModule)
      },
      {
        path: 'scheduler',
        loadChildren: () => import('./scheduler/scheduler.module').then(m => m.DevAppSchedulerModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class DevAppEntityModule {}
