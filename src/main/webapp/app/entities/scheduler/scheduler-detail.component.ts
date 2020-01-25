import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IScheduler } from 'app/shared/model/scheduler.model';

@Component({
  selector: 'jhi-scheduler-detail',
  templateUrl: './scheduler-detail.component.html'
})
export class SchedulerDetailComponent implements OnInit {
  scheduler: IScheduler | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ scheduler }) => {
      this.scheduler = scheduler;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
