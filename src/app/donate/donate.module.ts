import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonateRoutingModule } from './donate-routing.module';
import { DonatePageComponent } from './donate-page/donate-page.component';

@NgModule({
  imports: [
    CommonModule,
    DonateRoutingModule
  ],
  declarations: [DonatePageComponent]
})
export class DonateModule { }
