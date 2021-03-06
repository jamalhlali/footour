import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { FootourSharedModule } from 'app/shared';
import {
  TournamentComponent,
  TournamentDetailComponent,
  TournamentUpdateComponent,
  TournamentDeletePopupComponent,
  TournamentDeleteDialogComponent,
  tournamentRoute,
  tournamentPopupRoute
} from './';

const ENTITY_STATES = [...tournamentRoute, ...tournamentPopupRoute];

@NgModule({
  imports: [FootourSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TournamentComponent,
    TournamentDetailComponent,
    TournamentUpdateComponent,
    TournamentDeleteDialogComponent,
    TournamentDeletePopupComponent
  ],
  entryComponents: [TournamentComponent, TournamentUpdateComponent, TournamentDeleteDialogComponent, TournamentDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FootourTournamentModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
