import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DevAppTestModule } from '../../../test.module';
import { SchedulerDetailComponent } from 'app/entities/scheduler/scheduler-detail.component';
import { Scheduler } from 'app/shared/model/scheduler.model';

describe('Component Tests', () => {
  describe('Scheduler Management Detail Component', () => {
    let comp: SchedulerDetailComponent;
    let fixture: ComponentFixture<SchedulerDetailComponent>;
    const route = ({ data: of({ scheduler: new Scheduler(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevAppTestModule],
        declarations: [SchedulerDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SchedulerDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SchedulerDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load scheduler on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.scheduler).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
