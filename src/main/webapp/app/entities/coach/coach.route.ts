import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Coach } from 'app/shared/model/coach.model';
import { CoachService } from './coach.service';
import { CoachComponent } from './coach.component';
import { CoachDetailComponent } from './coach-detail.component';
import { CoachUpdateComponent } from './coach-update.component';
import { CoachDeletePopupComponent } from './coach-delete-dialog.component';
import { ICoach } from 'app/shared/model/coach.model';

@Injectable({ providedIn: 'root' })
export class CoachResolve implements Resolve<ICoach> {
  constructor(private service: CoachService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICoach> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Coach>) => response.ok),
        map((coach: HttpResponse<Coach>) => coach.body)
      );
    }
    return of(new Coach());
  }
}

export const coachRoute: Routes = [
  {
    path: '',
    component: CoachComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'footourApp.coach.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CoachDetailComponent,
    resolve: {
      coach: CoachResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'footourApp.coach.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CoachUpdateComponent,
    resolve: {
      coach: CoachResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'footourApp.coach.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CoachUpdateComponent,
    resolve: {
      coach: CoachResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'footourApp.coach.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const coachPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CoachDeletePopupComponent,
    resolve: {
      coach: CoachResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'footourApp.coach.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
