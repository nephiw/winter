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
import { SharedModule } from '@app/common/shared.module';
import { DetailPageComponent } from './house-page/detail-page/detail-page.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
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
    HouseEndedComponent,
    DetailPageComponent
  ]
})
export class HouseModule { }
