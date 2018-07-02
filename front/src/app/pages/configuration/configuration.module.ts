import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigurationComponent } from './configuration.component';
import { routing } from './configuration.routing';
import { NbCardModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    routing,
    NbCardModule,
    Ng2SmartTableModule,
    ToasterModule
  ],
  declarations: [
    ConfigurationComponent
  ]
})
export class ConfigurationModule {}
