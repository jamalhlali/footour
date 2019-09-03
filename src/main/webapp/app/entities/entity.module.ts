import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'player',
        loadChildren: () => import('./player/player.module').then(m => m.FootourPlayerModule)
      },
      {
        path: 'coach',
        loadChildren: () => import('./coach/coach.module').then(m => m.FootourCoachModule)
      },
      {
        path: 'organizer',
        loadChildren: () => import('./organizer/organizer.module').then(m => m.FootourOrganizerModule)
      },
      {
        path: 'team',
        loadChildren: () => import('./team/team.module').then(m => m.FootourTeamModule)
      },
      {
        path: 'tournament',
        loadChildren: () => import('./tournament/tournament.module').then(m => m.FootourTournamentModule)
      },
      {
        path: 'location',
        loadChildren: () => import('./location/location.module').then(m => m.FootourLocationModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FootourEntityModule {}
