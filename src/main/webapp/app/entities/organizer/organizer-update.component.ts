import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IOrganizer, Organizer } from 'app/shared/model/organizer.model';
import { OrganizerService } from './organizer.service';
import { ITournament } from 'app/shared/model/tournament.model';
import { TournamentService } from 'app/entities/tournament';

@Component({
  selector: 'jhi-organizer-update',
  templateUrl: './organizer-update.component.html'
})
export class OrganizerUpdateComponent implements OnInit {
  isSaving: boolean;

  tournaments: ITournament[];

  editForm = this.fb.group({
    id: [],
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    email: [],
    phoneNumber: [],
    tournament: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected organizerService: OrganizerService,
    protected tournamentService: TournamentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ organizer }) => {
      this.updateForm(organizer);
    });
    this.tournamentService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITournament[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITournament[]>) => response.body)
      )
      .subscribe((res: ITournament[]) => (this.tournaments = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(organizer: IOrganizer) {
    this.editForm.patchValue({
      id: organizer.id,
      firstName: organizer.firstName,
      lastName: organizer.lastName,
      email: organizer.email,
      phoneNumber: organizer.phoneNumber,
      tournament: organizer.tournament
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const organizer = this.createFromForm();
    if (organizer.id !== undefined) {
      this.subscribeToSaveResponse(this.organizerService.update(organizer));
    } else {
      this.subscribeToSaveResponse(this.organizerService.create(organizer));
    }
  }

  private createFromForm(): IOrganizer {
    return {
      ...new Organizer(),
      id: this.editForm.get(['id']).value,
      firstName: this.editForm.get(['firstName']).value,
      lastName: this.editForm.get(['lastName']).value,
      email: this.editForm.get(['email']).value,
      phoneNumber: this.editForm.get(['phoneNumber']).value,
      tournament: this.editForm.get(['tournament']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrganizer>>) {
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

  trackTournamentById(index: number, item: ITournament) {
    return item.id;
  }
}
