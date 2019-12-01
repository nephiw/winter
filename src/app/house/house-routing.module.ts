import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  HousePageComponent,
  HouseCompleteComponent,
  VoteFormComponent,
  HouseFormComponent,
  HouseEndedComponent,
  DetailPageComponent
} from './house-page';

const routes: Routes = [
  { path: '', redirectTo: 'vote' },
  { path: '', component: HousePageComponent, children: [
    { path: 'form', component: HouseFormComponent },
    { path: 'complete', component: HouseCompleteComponent },
    { path: 'ended', component: HouseEndedComponent },
    { path: 'vote', component: VoteFormComponent },
    { path: ':entry', component: DetailPageComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HouseRoutingModule { }
