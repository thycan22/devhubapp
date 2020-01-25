import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DevAppTestModule } from '../../../test.module';
import { ReservationEventComponent } from 'app/entities/reservation-event/reservation-event.component';
import { ReservationEventService } from 'app/entities/reservation-event/reservation-event.service';
import { ReservationEvent } from 'app/shared/model/reservation-event.model';

describe('Component Tests', () => {
  describe('ReservationEvent Management Component', () => {
    let comp: ReservationEventComponent;
    let fixture: ComponentFixture<ReservationEventComponent>;
    let service: ReservationEventService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevAppTestModule],
        declarations: [ReservationEventComponent],
        providers: []
      })
        .overrideTemplate(ReservationEventComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ReservationEventComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ReservationEventService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ReservationEvent(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.reservationEvents && comp.reservationEvents[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
