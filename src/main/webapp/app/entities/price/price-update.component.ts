import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPrice, Price } from 'app/shared/model/price.model';
import { PriceService } from './price.service';

@Component({
  selector: 'jhi-price-update',
  templateUrl: './price-update.component.html'
})
export class PriceUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    price: [],
    statusPeriod: []
  });

  constructor(protected priceService: PriceService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ price }) => {
      this.updateForm(price);
    });
  }

  updateForm(price: IPrice): void {
    this.editForm.patchValue({
      id: price.id,
      price: price.price,
      statusPeriod: price.statusPeriod
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const price = this.createFromForm();
    if (price.id !== undefined) {
      this.subscribeToSaveResponse(this.priceService.update(price));
    } else {
      this.subscribeToSaveResponse(this.priceService.create(price));
    }
  }

  private createFromForm(): IPrice {
    return {
      ...new Price(),
      id: this.editForm.get(['id'])!.value,
      price: this.editForm.get(['price'])!.value,
      statusPeriod: this.editForm.get(['statusPeriod'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPrice>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
