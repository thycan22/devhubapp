import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRoomType, RoomType } from 'app/shared/model/room-type.model';
import { RoomTypeService } from './room-type.service';
import { RoomTypeComponent } from './room-type.component';
import { RoomTypeDetailComponent } from './room-type-detail.component';
import { RoomTypeUpdateComponent } from './room-type-update.component';

@Injectable({ providedIn: 'root' })
export class RoomTypeResolve implements Resolve<IRoomType> {
  constructor(private service: RoomTypeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRoomType> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((roomType: HttpResponse<RoomType>) => {
          if (roomType.body) {
            return of(roomType.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RoomType());
  }
}

export const roomTypeRoute: Routes = [
  {
    path: '',
    component: RoomTypeComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'devApp.roomType.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RoomTypeDetailComponent,
    resolve: {
      roomType: RoomTypeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'devApp.roomType.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RoomTypeUpdateComponent,
    resolve: {
      roomType: RoomTypeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'devApp.roomType.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RoomTypeUpdateComponent,
    resolve: {
      roomType: RoomTypeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'devApp.roomType.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
