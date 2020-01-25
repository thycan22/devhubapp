import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IResource, Resource } from 'app/shared/model/resource.model';
import { ResourceService } from './resource.service';
import { IRoomType } from 'app/shared/model/room-type.model';
import { RoomTypeService } from 'app/entities/room-type/room-type.service';

@Component({
  selector: 'jhi-resource-update',
  templateUrl: './resource-update.component.html'
})
export class ResourceUpdateComponent implements OnInit {
  isSaving = false;

  roomtypes: IRoomType[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    roomType: []
  });

  constructor(
    protected resourceService: ResourceService,
    protected roomTypeService: RoomTypeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ resource }) => {
      this.updateForm(resource);

      this.roomTypeService
        .query()
        .pipe(
          map((res: HttpResponse<IRoomType[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IRoomType[]) => (this.roomtypes = resBody));
    });
  }

  updateForm(resource: IResource): void {
    this.editForm.patchValue({
      id: resource.id,
      name: resource.name,
      roomType: resource.roomType
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const resource = this.createFromForm();
    if (resource.id !== undefined) {
      this.subscribeToSaveResponse(this.resourceService.update(resource));
    } else {
      this.subscribeToSaveResponse(this.resourceService.create(resource));
    }
  }

  private createFromForm(): IResource {
    return {
      ...new Resource(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      roomType: this.editForm.get(['roomType'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IResource>>): void {
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

  trackById(index: number, item: IRoomType): any {
    return item.id;
  }
}
