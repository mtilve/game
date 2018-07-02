import { Routes, RouterModule }  from '@angular/router';
import { VictoryComponent } from './victory.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: VictoryComponent
  }
];

export const routing = RouterModule.forChild(routes);
