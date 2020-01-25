import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { DevAppTestModule } from '../../../test.module';
import { SchedulerUpdateComponent } from 'app/entities/scheduler/scheduler-update.component';
import { SchedulerService } from 'app/entities/scheduler/scheduler.service';
import { Scheduler } from 'app/shared/model/scheduler.model';

describe('Component Tests', () => {
  describe('Scheduler Management Update Component', () => {
    let comp: SchedulerUpdateComponent;
    let fixture: ComponentFixture<SchedulerUpdateComponent>;
    let service: SchedulerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevAppTestModule],
        declarations: [SchedulerUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SchedulerUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SchedulerUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SchedulerService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Scheduler(123);
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
        const entity = new Scheduler();
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
