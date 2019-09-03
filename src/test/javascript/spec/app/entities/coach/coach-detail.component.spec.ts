/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FootourTestModule } from '../../../test.module';
import { CoachDetailComponent } from 'app/entities/coach/coach-detail.component';
import { Coach } from 'app/shared/model/coach.model';

describe('Component Tests', () => {
  describe('Coach Management Detail Component', () => {
    let comp: CoachDetailComponent;
    let fixture: ComponentFixture<CoachDetailComponent>;
    const route = ({ data: of({ coach: new Coach(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FootourTestModule],
        declarations: [CoachDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CoachDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CoachDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.coach).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
