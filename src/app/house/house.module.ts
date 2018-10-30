import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HouseRoutingModule } from './house-routing.module';
import { HousePageComponent } from './house-page/house-page.component';

@NgModule({
  imports: [
    CommonModule,
    HouseRoutingModule
  ],
  declarations: [HousePageComponent]
})
export class HouseModule { }
