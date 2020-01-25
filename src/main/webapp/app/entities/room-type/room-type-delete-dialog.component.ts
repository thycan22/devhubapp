import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRoomType } from 'app/shared/model/room-type.model';
import { RoomTypeService } from './room-type.service';

@Component({
  templateUrl: './room-type-delete-dialog.component.html'
})
export class RoomTypeDeleteDialogComponent {
  roomType?: IRoomType;

  constructor(protected roomTypeService: RoomTypeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.roomTypeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('roomTypeListModification');
      this.activeModal.close();
    });
  }
}
