import { Routes, RouterModule }  from '@angular/router';
import { GameComponent } from './game.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: GameComponent
  }
];

export const routing = RouterModule.forChild(routes);
