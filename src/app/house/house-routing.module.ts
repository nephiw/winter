import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  HousePageComponent,
  HouseCompleteComponent,
  VoteFormComponent
} from './house-page';
import { HouseEndedComponent } from './house-page/house-ended/house-ended.component';

const routes: Routes = [
  { path: '', redirectTo: 'vote' },
  { path: '', component: HousePageComponent, children: [
    { path: 'form', redirectTo: 'ended' },
    { path: 'complete', component: HouseCompleteComponent },
    { path: 'ended', component: HouseEndedComponent },
    { path: 'vote', component: VoteFormComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HouseRoutingModule { }
