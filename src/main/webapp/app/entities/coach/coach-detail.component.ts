import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICoach } from 'app/shared/model/coach.model';

@Component({
  selector: 'jhi-coach-detail',
  templateUrl: './coach-detail.component.html'
})
export class CoachDetailComponent implements OnInit {
  coach: ICoach;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ coach }) => {
      this.coach = coach;
    });
  }

  previousState() {
    window.history.back();
  }
}
