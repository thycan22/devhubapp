import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IScheduler } from 'app/shared/model/scheduler.model';
import { SchedulerService } from './scheduler.service';

@Component({
  templateUrl: './scheduler-delete-dialog.component.html'
})
export class SchedulerDeleteDialogComponent {
  scheduler?: IScheduler;

  constructor(protected schedulerService: SchedulerService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.schedulerService.delete(id).subscribe(() => {
      this.eventManager.broadcast('schedulerListModification');
      this.activeModal.close();
    });
  }
}
