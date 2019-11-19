import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { DateService } from '../common/date/date.service';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [HomePageComponent],
  providers: [DateService]
})
export class HomeModule {}
