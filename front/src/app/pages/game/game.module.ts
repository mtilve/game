import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameComponent } from './game.component';
import { routing } from './game.routing';




@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    routing
  ],
  declarations: [
    GameComponent
  ]
})
export class GameModule {}
