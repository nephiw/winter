import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { HouseRoutingModule } from './house-routing.module';

import {
  HousePageComponent,
  HouseFormComponent,
  HouseCompleteComponent,
  VoteFormComponent,
  HouseEntryComponent
} from './house-page';
import { HouseEndedComponent } from './house-page/house-ended/house-ended.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HouseRoutingModule,
    GalleryModule
  ],
  declarations: [
    HousePageComponent,
    HouseFormComponent,
    HouseCompleteComponent,
    VoteFormComponent,
    HouseEntryComponent,
    HouseEndedComponent
  ]
})
export class HouseModule { }
