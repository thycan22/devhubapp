import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { DevAppTestModule } from '../../../test.module';
import { ReservationEventUpdateComponent } from 'app/entities/reservation-event/reservation-event-update.component';
import { ReservationEventService } from 'app/entities/reservation-event/reservation-event.service';
import { ReservationEvent } from 'app/shared/model/reservation-event.model';

describe('Component Tests', () => {
  describe('ReservationEvent Management Update Component', () => {
    let comp: ReservationEventUpdateComponent;
    let fixture: ComponentFixture<ReservationEventUpdateComponent>;
    let service: ReservationEventService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevAppTestModule],
        declarations: [ReservationEventUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ReservationEventUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ReservationEventUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ReservationEventService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ReservationEvent(123);
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
        const entity = new ReservationEvent();
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
