/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FootourTestModule } from '../../../test.module';
import { OrganizerDetailComponent } from 'app/entities/organizer/organizer-detail.component';
import { Organizer } from 'app/shared/model/organizer.model';

describe('Component Tests', () => {
  describe('Organizer Management Detail Component', () => {
    let comp: OrganizerDetailComponent;
    let fixture: ComponentFixture<OrganizerDetailComponent>;
    const route = ({ data: of({ organizer: new Organizer(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FootourTestModule],
        declarations: [OrganizerDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(OrganizerDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OrganizerDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.organizer).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
