import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatsComponent } from './stats.component';
import { routing } from './stats.routing';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    routing
  ],
  declarations: [
    StatsComponent
  ]
})
export class StatsModule {}
