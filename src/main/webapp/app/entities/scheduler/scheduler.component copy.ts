import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IScheduler } from 'app/shared/model/scheduler.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { SchedulerService } from './scheduler.service';
import { SchedulerDeleteDialogComponent } from './scheduler-delete-dialog.component';

@Component({
  selector: 'jhi-scheduler',
  templateUrl: './scheduler.component.html'
})
export class SchedulerComponent implements OnInit, OnDestroy {
  schedulers: IScheduler[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected schedulerService: SchedulerService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.schedulers = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.schedulerService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IScheduler[]>) => this.paginateSchedulers(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.schedulers = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSchedulers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IScheduler): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSchedulers(): void {
    this.eventSubscriber = this.eventManager.subscribe('schedulerListModification', () => this.reset());
  }

  delete(scheduler: IScheduler): void {
    const modalRef = this.modalService.open(SchedulerDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.scheduler = scheduler;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateSchedulers(data: IScheduler[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.schedulers.push(data[i]);
      }
    }
  }
}
