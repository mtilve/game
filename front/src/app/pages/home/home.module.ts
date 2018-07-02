import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { routing } from './home.routing';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    routing
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule {}
