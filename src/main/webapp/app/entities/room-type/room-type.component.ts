import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRoomType } from 'app/shared/model/room-type.model';
import { RoomTypeService } from './room-type.service';
import { RoomTypeDeleteDialogComponent } from './room-type-delete-dialog.component';

@Component({
  selector: 'jhi-room-type',
  templateUrl: './room-type.component.html'
})
export class RoomTypeComponent implements OnInit, OnDestroy {
  roomTypes?: IRoomType[];
  eventSubscriber?: Subscription;

  constructor(protected roomTypeService: RoomTypeService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.roomTypeService.query().subscribe((res: HttpResponse<IRoomType[]>) => {
      this.roomTypes = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRoomTypes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRoomType): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInRoomTypes(): void {
    this.eventSubscriber = this.eventManager.subscribe('roomTypeListModification', () => this.loadAll());
  }

  delete(roomType: IRoomType): void {
    const modalRef = this.modalService.open(RoomTypeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.roomType = roomType;
  }
}
