import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { FootourSharedModule } from 'app/shared';
import {
  OrganizerComponent,
  OrganizerDetailComponent,
  OrganizerUpdateComponent,
  OrganizerDeletePopupComponent,
  OrganizerDeleteDialogComponent,
  organizerRoute,
  organizerPopupRoute
} from './';

const ENTITY_STATES = [...organizerRoute, ...organizerPopupRoute];

@NgModule({
  imports: [FootourSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    OrganizerComponent,
    OrganizerDetailComponent,
    OrganizerUpdateComponent,
    OrganizerDeleteDialogComponent,
    OrganizerDeletePopupComponent
  ],
  entryComponents: [OrganizerComponent, OrganizerUpdateComponent, OrganizerDeleteDialogComponent, OrganizerDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FootourOrganizerModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
