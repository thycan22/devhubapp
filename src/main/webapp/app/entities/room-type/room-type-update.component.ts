import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IRoomType, RoomType } from 'app/shared/model/room-type.model';
import { RoomTypeService } from './room-type.service';

@Component({
  selector: 'jhi-room-type-update',
  templateUrl: './room-type-update.component.html'
})
export class RoomTypeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    typeBed: [],
    bathroom: []
  });

  constructor(protected roomTypeService: RoomTypeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ roomType }) => {
      this.updateForm(roomType);
    });
  }

  updateForm(roomType: IRoomType): void {
    this.editForm.patchValue({
      id: roomType.id,
      typeBed: roomType.typeBed,
      bathroom: roomType.bathroom
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const roomType = this.createFromForm();
    if (roomType.id !== undefined) {
      this.subscribeToSaveResponse(this.roomTypeService.update(roomType));
    } else {
      this.subscribeToSaveResponse(this.roomTypeService.create(roomType));
    }
  }

  private createFromForm(): IRoomType {
    return {
      ...new RoomType(),
      id: this.editForm.get(['id'])!.value,
      typeBed: this.editForm.get(['typeBed'])!.value,
      bathroom: this.editForm.get(['bathroom'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRoomType>>): void {
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
