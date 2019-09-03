import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICoach, Coach } from 'app/shared/model/coach.model';
import { CoachService } from './coach.service';
import { ITeam } from 'app/shared/model/team.model';
import { TeamService } from 'app/entities/team';

@Component({
  selector: 'jhi-coach-update',
  templateUrl: './coach-update.component.html'
})
export class CoachUpdateComponent implements OnInit {
  isSaving: boolean;

  teams: ITeam[];

  editForm = this.fb.group({
    id: [],
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    email: [],
    phoneNumber: [],
    team: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected coachService: CoachService,
    protected teamService: TeamService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ coach }) => {
      this.updateForm(coach);
    });
    this.teamService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITeam[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITeam[]>) => response.body)
      )
      .subscribe((res: ITeam[]) => (this.teams = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(coach: ICoach) {
    this.editForm.patchValue({
      id: coach.id,
      firstName: coach.firstName,
      lastName: coach.lastName,
      email: coach.email,
      phoneNumber: coach.phoneNumber,
      team: coach.team
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const coach = this.createFromForm();
    if (coach.id !== undefined) {
      this.subscribeToSaveResponse(this.coachService.update(coach));
    } else {
      this.subscribeToSaveResponse(this.coachService.create(coach));
    }
  }

  private createFromForm(): ICoach {
    return {
      ...new Coach(),
      id: this.editForm.get(['id']).value,
      firstName: this.editForm.get(['firstName']).value,
      lastName: this.editForm.get(['lastName']).value,
      email: this.editForm.get(['email']).value,
      phoneNumber: this.editForm.get(['phoneNumber']).value,
      team: this.editForm.get(['team']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICoach>>) {
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

  trackTeamById(index: number, item: ITeam) {
    return item.id;
  }
}
