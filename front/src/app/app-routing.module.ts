import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home/home.component'
import { GameComponent } from './pages/game/game.component'
import { ConfigurationComponent } from './pages/configuration/configuration.component'
import { VictoryComponent } from './pages/victory/victory.component'
import { StatsComponent } from './pages/stats/stats.component'
import { NotFoundComponent } from './pages/miscellaneous/not-found/not-found.component';

const routes: Routes = [
  { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule' },
  {
    path: 'home',
    component: HomeComponent
  },  {
    path: 'game',
    component: GameComponent
  },  {
    path: 'configuration',
    component: ConfigurationComponent
  },  {
    path: 'victory',
    component: VictoryComponent
  },  {
    path: 'stats',
    component: StatsComponent
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
