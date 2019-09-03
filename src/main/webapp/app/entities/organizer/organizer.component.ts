import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOrganizer } from 'app/shared/model/organizer.model';
import { AccountService } from 'app/core';
import { OrganizerService } from './organizer.service';

@Component({
  selector: 'jhi-organizer',
  templateUrl: './organizer.component.html'
})
export class OrganizerComponent implements OnInit, OnDestroy {
  organizers: IOrganizer[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected organizerService: OrganizerService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.organizerService
      .query()
      .pipe(
        filter((res: HttpResponse<IOrganizer[]>) => res.ok),
        map((res: HttpResponse<IOrganizer[]>) => res.body)
      )
      .subscribe(
        (res: IOrganizer[]) => {
          this.organizers = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInOrganizers();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IOrganizer) {
    return item.id;
  }

  registerChangeInOrganizers() {
    this.eventSubscriber = this.eventManager.subscribe('organizerListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
