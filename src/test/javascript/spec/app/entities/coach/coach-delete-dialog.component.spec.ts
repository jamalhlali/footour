/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { FootourTestModule } from '../../../test.module';
import { CoachDeleteDialogComponent } from 'app/entities/coach/coach-delete-dialog.component';
import { CoachService } from 'app/entities/coach/coach.service';

describe('Component Tests', () => {
  describe('Coach Management Delete Component', () => {
    let comp: CoachDeleteDialogComponent;
    let fixture: ComponentFixture<CoachDeleteDialogComponent>;
    let service: CoachService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FootourTestModule],
        declarations: [CoachDeleteDialogComponent]
      })
        .overrideTemplate(CoachDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CoachDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CoachService);
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
