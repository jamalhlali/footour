import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICoach } from 'app/shared/model/coach.model';
import { CoachService } from './coach.service';

@Component({
  selector: 'jhi-coach-delete-dialog',
  templateUrl: './coach-delete-dialog.component.html'
})
export class CoachDeleteDialogComponent {
  coach: ICoach;

  constructor(protected coachService: CoachService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.coachService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'coachListModification',
        content: 'Deleted an coach'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-coach-delete-popup',
  template: ''
})
export class CoachDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ coach }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CoachDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.coach = coach;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/coach', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/coach', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
