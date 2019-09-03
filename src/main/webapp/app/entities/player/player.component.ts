import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPlayer } from 'app/shared/model/player.model';
import { AccountService } from 'app/core';
import { PlayerService } from './player.service';

@Component({
  selector: 'jhi-player',
  templateUrl: './player.component.html'
})
export class PlayerComponent implements OnInit, OnDestroy {
  players: IPlayer[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected playerService: PlayerService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.playerService
      .query()
      .pipe(
        filter((res: HttpResponse<IPlayer[]>) => res.ok),
        map((res: HttpResponse<IPlayer[]>) => res.body)
      )
      .subscribe(
        (res: IPlayer[]) => {
          this.players = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPlayers();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPlayer) {
    return item.id;
  }

  registerChangeInPlayers() {
    this.eventSubscriber = this.eventManager.subscribe('playerListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
