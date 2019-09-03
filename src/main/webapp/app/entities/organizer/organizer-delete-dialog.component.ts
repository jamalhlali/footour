import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrganizer } from 'app/shared/model/organizer.model';
import { OrganizerService } from './organizer.service';

@Component({
  selector: 'jhi-organizer-delete-dialog',
  templateUrl: './organizer-delete-dialog.component.html'
})
export class OrganizerDeleteDialogComponent {
  organizer: IOrganizer;

  constructor(protected organizerService: OrganizerService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.organizerService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'organizerListModification',
        content: 'Deleted an organizer'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-organizer-delete-popup',
  template: ''
})
export class OrganizerDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ organizer }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(OrganizerDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.organizer = organizer;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/organizer', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/organizer', { outlets: { popup: null } }]);
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
