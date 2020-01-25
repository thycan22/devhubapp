import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IScheduler, Scheduler } from 'app/shared/model/scheduler.model';
import { SchedulerService } from './scheduler.service';
import { SchedulerComponent } from './scheduler.component';
import { SchedulerDetailComponent } from './scheduler-detail.component';
import { SchedulerUpdateComponent } from './scheduler-update.component';

@Injectable({ providedIn: 'root' })
export class SchedulerResolve implements Resolve<IScheduler> {
  constructor(private service: SchedulerService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IScheduler> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((scheduler: HttpResponse<Scheduler>) => {
          if (scheduler.body) {
            return of(scheduler.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Scheduler());
  }
}

export const schedulerRoute: Routes = [
  {
    path: '',
    component: SchedulerComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'devApp.scheduler.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SchedulerDetailComponent,
    resolve: {
      scheduler: SchedulerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'devApp.scheduler.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SchedulerUpdateComponent,
    resolve: {
      scheduler: SchedulerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'devApp.scheduler.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SchedulerUpdateComponent,
    resolve: {
      scheduler: SchedulerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'devApp.scheduler.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
