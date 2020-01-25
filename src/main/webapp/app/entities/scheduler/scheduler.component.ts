import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IScheduler } from 'app/shared/model/scheduler.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { SchedulerDeleteDialogComponent } from './scheduler-delete-dialog.component';
import { DayPilot, DayPilotSchedulerComponent } from 'daypilot-pro-angular';
import { ResourceService } from '../resource/resource.service';
import { IResource } from 'app/shared/model/resource.model';
import { ReservationEventService } from '../reservation-event/reservation-event.service';
import { IReservationEvent, EventCreateParams } from 'app/shared/model/reservation-event.model';

@Component({
  selector: 'jhi-scheduler',
  templateUrl: './scheduler.component.html'
})
export class SchedulerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('scheduler', { static: false })
  scheduler!: DayPilotSchedulerComponent;
  events: any;

  config: any = {
    timeHeaders: [
      { groupBy: 'Year', format: 'yyyy' },
      { groupBy: 'Month', format: 'MMMM yyyy' },
      { groupBy: 'Day', format: 'd' }
    ],
    days: 31,
    startDate: '2020-06-01',
    scale: 'Day',
    onTimeRangeSelected: (args: { start: { toString: () => any }; end: { toString: () => any }; resource: any }) => {
      DayPilot.Modal.prompt('New event name:', 'Event').then(modal => {
        this.scheduler.control.clearSelection();
        if (!modal.result) {
          return;
        }

        const params: IReservationEvent = {
          start: args.start.toString(),
          end: args.end.toString(),
          text: modal.result,
          resource: args.resource
        };
        this.reservationEventService.create(params).subscribe(result => {
          this.events.push(result);
          this.scheduler.control.message('Event created');
        });
      });
    }
  };
  schedulers: IScheduler[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected reservationEventService: ReservationEventService,
    protected resourceService: ResourceService,
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
    this.resourceService.query().subscribe((res: HttpResponse<IResource[]>) => {
      // trie par id croissant
      res.body
        ? res.body.sort(function(a, b): number {
            a ? a : 0;
            b ? b : 0;
            return a.id - b.id;
          })
        : [];
      // envoie de mes resources vers Day-pilot au travers de 'config'
      this.config.resources = res.body ? res.body : [];
    });
    const from = this.scheduler.control.visibleStart();
    const to = this.scheduler.control.visibleEnd();
    this.reservationEventService.getEvents(from, to).subscribe(result => (this.events = result));
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
  ngAfterViewInit(): void {
    this.loadAll();
    this.registerChangeInSchedulers();
  }
}
