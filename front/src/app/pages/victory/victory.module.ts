import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VictoryComponent } from './victory.component';
import { routing } from './victory.routing';
import { NbCardModule } from '@nebular/theme';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    routing,
    NbCardModule
  ],
  declarations: [
    VictoryComponent
  ]
})
export class VictoryModule {}
