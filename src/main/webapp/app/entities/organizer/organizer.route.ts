import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Organizer } from 'app/shared/model/organizer.model';
import { OrganizerService } from './organizer.service';
import { OrganizerComponent } from './organizer.component';
import { OrganizerDetailComponent } from './organizer-detail.component';
import { OrganizerUpdateComponent } from './organizer-update.component';
import { OrganizerDeletePopupComponent } from './organizer-delete-dialog.component';
import { IOrganizer } from 'app/shared/model/organizer.model';

@Injectable({ providedIn: 'root' })
export class OrganizerResolve implements Resolve<IOrganizer> {
  constructor(private service: OrganizerService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOrganizer> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Organizer>) => response.ok),
        map((organizer: HttpResponse<Organizer>) => organizer.body)
      );
    }
    return of(new Organizer());
  }
}

export const organizerRoute: Routes = [
  {
    path: '',
    component: OrganizerComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'footourApp.organizer.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: OrganizerDetailComponent,
    resolve: {
      organizer: OrganizerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'footourApp.organizer.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: OrganizerUpdateComponent,
    resolve: {
      organizer: OrganizerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'footourApp.organizer.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: OrganizerUpdateComponent,
    resolve: {
      organizer: OrganizerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'footourApp.organizer.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const organizerPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: OrganizerDeletePopupComponent,
    resolve: {
      organizer: OrganizerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'footourApp.organizer.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
