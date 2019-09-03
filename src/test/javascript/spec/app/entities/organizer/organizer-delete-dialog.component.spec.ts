/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { FootourTestModule } from '../../../test.module';
import { OrganizerDeleteDialogComponent } from 'app/entities/organizer/organizer-delete-dialog.component';
import { OrganizerService } from 'app/entities/organizer/organizer.service';

describe('Component Tests', () => {
  describe('Organizer Management Delete Component', () => {
    let comp: OrganizerDeleteDialogComponent;
    let fixture: ComponentFixture<OrganizerDeleteDialogComponent>;
    let service: OrganizerService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FootourTestModule],
        declarations: [OrganizerDeleteDialogComponent]
      })
        .overrideTemplate(OrganizerDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OrganizerDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrganizerService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
