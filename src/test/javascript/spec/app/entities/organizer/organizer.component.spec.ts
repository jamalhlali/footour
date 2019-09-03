/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FootourTestModule } from '../../../test.module';
import { OrganizerComponent } from 'app/entities/organizer/organizer.component';
import { OrganizerService } from 'app/entities/organizer/organizer.service';
import { Organizer } from 'app/shared/model/organizer.model';

describe('Component Tests', () => {
  describe('Organizer Management Component', () => {
    let comp: OrganizerComponent;
    let fixture: ComponentFixture<OrganizerComponent>;
    let service: OrganizerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FootourTestModule],
        declarations: [OrganizerComponent],
        providers: []
      })
        .overrideTemplate(OrganizerComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrganizerComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrganizerService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Organizer(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.organizers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
