import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICoach } from 'app/shared/model/coach.model';
import { AccountService } from 'app/core';
import { CoachService } from './coach.service';

@Component({
  selector: 'jhi-coach',
  templateUrl: './coach.component.html'
})
export class CoachComponent implements OnInit, OnDestroy {
  coaches: ICoach[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected coachService: CoachService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.coachService
      .query()
      .pipe(
        filter((res: HttpResponse<ICoach[]>) => res.ok),
        map((res: HttpResponse<ICoach[]>) => res.body)
      )
      .subscribe(
        (res: ICoach[]) => {
          this.coaches = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInCoaches();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICoach) {
    return item.id;
  }

  registerChangeInCoaches() {
    this.eventSubscriber = this.eventManager.subscribe('coachListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
