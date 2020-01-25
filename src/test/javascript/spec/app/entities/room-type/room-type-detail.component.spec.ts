import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DevAppTestModule } from '../../../test.module';
import { RoomTypeDetailComponent } from 'app/entities/room-type/room-type-detail.component';
import { RoomType } from 'app/shared/model/room-type.model';

describe('Component Tests', () => {
  describe('RoomType Management Detail Component', () => {
    let comp: RoomTypeDetailComponent;
    let fixture: ComponentFixture<RoomTypeDetailComponent>;
    const route = ({ data: of({ roomType: new RoomType(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevAppTestModule],
        declarations: [RoomTypeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RoomTypeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RoomTypeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load roomType on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.roomType).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
