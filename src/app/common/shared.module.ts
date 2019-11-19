import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateService, OrdinalDatePipe } from './date';

@NgModule({
  declarations: [
    OrdinalDatePipe
  ],
  imports: [
    CommonModule
  ],
  providers: [
    DateService
  ],
  exports: [
    OrdinalDatePipe
  ]
})
export class SharedModule { }
