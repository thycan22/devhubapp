import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { DevAppTestModule } from '../../../test.module';
import { RoomTypeUpdateComponent } from 'app/entities/room-type/room-type-update.component';
import { RoomTypeService } from 'app/entities/room-type/room-type.service';
import { RoomType } from 'app/shared/model/room-type.model';

describe('Component Tests', () => {
  describe('RoomType Management Update Component', () => {
    let comp: RoomTypeUpdateComponent;
    let fixture: ComponentFixture<RoomTypeUpdateComponent>;
    let service: RoomTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevAppTestModule],
        declarations: [RoomTypeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(RoomTypeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RoomTypeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RoomTypeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RoomType(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new RoomType();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
