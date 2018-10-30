import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HousePageComponent } from './house-page';

const routes: Routes = [
  { path: '', component: HousePageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HouseRoutingModule { }
