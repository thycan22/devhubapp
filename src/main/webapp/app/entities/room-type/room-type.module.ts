import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DevAppSharedModule } from 'app/shared/shared.module';
import { RoomTypeComponent } from './room-type.component';
import { RoomTypeDetailComponent } from './room-type-detail.component';
import { RoomTypeUpdateComponent } from './room-type-update.component';
import { RoomTypeDeleteDialogComponent } from './room-type-delete-dialog.component';
import { roomTypeRoute } from './room-type.route';

@NgModule({
  imports: [DevAppSharedModule, RouterModule.forChild(roomTypeRoute)],
  declarations: [RoomTypeComponent, RoomTypeDetailComponent, RoomTypeUpdateComponent, RoomTypeDeleteDialogComponent],
  entryComponents: [RoomTypeDeleteDialogComponent]
})
export class DevAppRoomTypeModule {}
