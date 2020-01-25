import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DevAppTestModule } from '../../../test.module';
import { ReservationEventDetailComponent } from 'app/entities/reservation-event/reservation-event-detail.component';
import { ReservationEvent } from 'app/shared/model/reservation-event.model';

describe('Component Tests', () => {
  describe('ReservationEvent Management Detail Component', () => {
    let comp: ReservationEventDetailComponent;
    let fixture: ComponentFixture<ReservationEventDetailComponent>;
    const route = ({ data: of({ reservationEvent: new ReservationEvent(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevAppTestModule],
        declarations: [ReservationEventDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ReservationEventDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ReservationEventDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load reservationEvent on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.reservationEvent).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
