import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { FootourSharedModule } from 'app/shared';
import {
  CoachComponent,
  CoachDetailComponent,
  CoachUpdateComponent,
  CoachDeletePopupComponent,
  CoachDeleteDialogComponent,
  coachRoute,
  coachPopupRoute
} from './';

const ENTITY_STATES = [...coachRoute, ...coachPopupRoute];

@NgModule({
  imports: [FootourSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [CoachComponent, CoachDetailComponent, CoachUpdateComponent, CoachDeleteDialogComponent, CoachDeletePopupComponent],
  entryComponents: [CoachComponent, CoachUpdateComponent, CoachDeleteDialogComponent, CoachDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FootourCoachModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
