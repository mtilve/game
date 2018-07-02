import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { VictoryComponent } from './victory/victory.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { StatsComponent } from './stats/stats.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
  {
    path: 'home',
    component: HomeComponent,
  },{
    path: 'game',
    component: GameComponent,
  },{
    path: 'victory',
    component: VictoryComponent,
  },{
    path: 'configuration',
    component: ConfigurationComponent
  },{
    path: 'stats',
    component: StatsComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }, {
    path: '**',
    component: NotFoundComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
