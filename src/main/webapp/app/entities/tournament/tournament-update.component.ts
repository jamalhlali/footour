import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ITournament, Tournament } from 'app/shared/model/tournament.model';
import { TournamentService } from './tournament.service';
import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location';

@Component({
  selector: 'jhi-tournament-update',
  templateUrl: './tournament-update.component.html'
})
export class TournamentUpdateComponent implements OnInit {
  isSaving: boolean;

  locations: ILocation[];

  editForm = this.fb.group({
    id: [],
    name: [],
    startDate: [],
    location: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected tournamentService: TournamentService,
    protected locationService: LocationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tournament }) => {
      this.updateForm(tournament);
    });
    this.locationService
      .query({ filter: 'tournament-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<ILocation[]>) => mayBeOk.ok),
        map((response: HttpResponse<ILocation[]>) => response.body)
      )
      .subscribe(
        (res: ILocation[]) => {
          if (!this.editForm.get('location').value || !this.editForm.get('location').value.id) {
            this.locations = res;
          } else {
            this.locationService
              .find(this.editForm.get('location').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<ILocation>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<ILocation>) => subResponse.body)
              )
              .subscribe(
                (subRes: ILocation) => (this.locations = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(tournament: ITournament) {
    this.editForm.patchValue({
      id: tournament.id,
      name: tournament.name,
      startDate: tournament.startDate != null ? tournament.startDate.format(DATE_TIME_FORMAT) : null,
      location: tournament.location
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tournament = this.createFromForm();
    if (tournament.id !== undefined) {
      this.subscribeToSaveResponse(this.tournamentService.update(tournament));
    } else {
      this.subscribeToSaveResponse(this.tournamentService.create(tournament));
    }
  }

  private createFromForm(): ITournament {
    return {
      ...new Tournament(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      startDate:
        this.editForm.get(['startDate']).value != null ? moment(this.editForm.get(['startDate']).value, DATE_TIME_FORMAT) : undefined,
      location: this.editForm.get(['location']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITournament>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackLocationById(index: number, item: ILocation) {
    return item.id;
  }
}
