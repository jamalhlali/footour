import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITeam, Team } from 'app/shared/model/team.model';
import { TeamService } from './team.service';
import { ITournament } from 'app/shared/model/tournament.model';
import { TournamentService } from 'app/entities/tournament';

@Component({
  selector: 'jhi-team-update',
  templateUrl: './team-update.component.html'
})
export class TeamUpdateComponent implements OnInit {
  isSaving: boolean;

  tournaments: ITournament[];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    city: [null, [Validators.required]],
    country: [null, [Validators.required]],
    tournament: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected teamService: TeamService,
    protected tournamentService: TournamentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ team }) => {
      this.updateForm(team);
    });
    this.tournamentService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITournament[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITournament[]>) => response.body)
      )
      .subscribe((res: ITournament[]) => (this.tournaments = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(team: ITeam) {
    this.editForm.patchValue({
      id: team.id,
      name: team.name,
      city: team.city,
      country: team.country,
      tournament: team.tournament
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const team = this.createFromForm();
    if (team.id !== undefined) {
      this.subscribeToSaveResponse(this.teamService.update(team));
    } else {
      this.subscribeToSaveResponse(this.teamService.create(team));
    }
  }

  private createFromForm(): ITeam {
    return {
      ...new Team(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      city: this.editForm.get(['city']).value,
      country: this.editForm.get(['country']).value,
      tournament: this.editForm.get(['tournament']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITeam>>) {
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
