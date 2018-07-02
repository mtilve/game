/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './pages/home/home.component'
import { GameComponent } from './pages/game/game.component'
import { ConfigurationComponent } from './pages/configuration/configuration.component'
import { VictoryComponent } from './pages/victory/victory.component'
import { StatsComponent } from './pages/stats/stats.component'
import { NotFoundComponent } from './pages/miscellaneous/not-found/not-found.component';
import { ToasterModule } from 'angular2-toaster';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbCardModule } from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';


@NgModule({
  declarations: [AppComponent, HomeComponent, GameComponent, 
    ConfigurationComponent, VictoryComponent, StatsComponent,
    NotFoundComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    ToasterModule,
    Ng2SmartTableModule,
    NbCardModule,
    NgxEchartsModule
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
})
export class AppModule {
}
