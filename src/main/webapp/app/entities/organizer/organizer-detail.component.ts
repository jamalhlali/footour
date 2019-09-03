import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrganizer } from 'app/shared/model/organizer.model';

@Component({
  selector: 'jhi-organizer-detail',
  templateUrl: './organizer-detail.component.html'
})
export class OrganizerDetailComponent implements OnInit {
  organizer: IOrganizer;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ organizer }) => {
      this.organizer = organizer;
    });
  }

  previousState() {
    window.history.back();
  }
}
