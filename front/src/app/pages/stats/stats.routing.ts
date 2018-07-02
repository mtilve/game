import { Routes, RouterModule }  from '@angular/router';
import { StatsComponent } from './stats.component';

const routes: Routes = [
  {
    path: '',
    component: StatsComponent
  }
];

export const routing = RouterModule.forChild(routes);
