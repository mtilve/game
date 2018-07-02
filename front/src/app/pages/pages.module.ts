import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { HomeModule } from './home/home.module';
import { GameModule } from './game/game.module';
import { VictoryModule } from './victory/victory.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { StatsModule } from './stats/stats.module';

const PAGES_COMPONENTS = [
  PagesComponent
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,
    HomeModule,
    GameModule,
    VictoryModule,
    ConfigurationModule,
    StatsModule
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
