import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HouseRoutingModule } from './house-routing.module';

import {
  HousePageComponent,
  HouseFormComponent,
  HouseCompleteComponent,
  VoteFormComponent,
  HouseEntryComponent
} from './house-page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HouseRoutingModule
  ],
  declarations: [
    HousePageComponent,
    HouseFormComponent,
    HouseCompleteComponent,
    VoteFormComponent,
    HouseEntryComponent
  ]
})
export class HouseModule { }
