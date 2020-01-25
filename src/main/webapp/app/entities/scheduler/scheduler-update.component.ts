import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IScheduler, Scheduler } from 'app/shared/model/scheduler.model';
import { SchedulerService } from './scheduler.service';

@Component({
  selector: 'jhi-scheduler-update',
  templateUrl: './scheduler-update.component.html'
})
export class SchedulerUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: []
  });

  constructor(protected schedulerService: SchedulerService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ scheduler }) => {
      this.updateForm(scheduler);
    });
  }

  updateForm(scheduler: IScheduler): void {
    this.editForm.patchValue({
      id: scheduler.id
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const scheduler = this.createFromForm();
    if (scheduler.id !== undefined) {
      this.subscribeToSaveResponse(this.schedulerService.update(scheduler));
    } else {
      this.subscribeToSaveResponse(this.schedulerService.create(scheduler));
    }
  }

  private createFromForm(): IScheduler {
    return {
      ...new Scheduler(),
      id: this.editForm.get(['id'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IScheduler>>): void {
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
