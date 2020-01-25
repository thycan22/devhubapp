import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPrice } from 'app/shared/model/price.model';
import { PriceService } from './price.service';
import { PriceDeleteDialogComponent } from './price-delete-dialog.component';

@Component({
  selector: 'jhi-price',
  templateUrl: './price.component.html'
})
export class PriceComponent implements OnInit, OnDestroy {
  prices?: IPrice[];
  eventSubscriber?: Subscription;

  constructor(protected priceService: PriceService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.priceService.query().subscribe((res: HttpResponse<IPrice[]>) => {
      this.prices = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPrices();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPrice): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPrices(): void {
    this.eventSubscriber = this.eventManager.subscribe('priceListModification', () => this.loadAll());
  }

  delete(price: IPrice): void {
    const modalRef = this.modalService.open(PriceDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.price = price;
  }
}
