import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  HousePageComponent,
  HouseFormComponent,
  HouseCompleteComponent,
  VoteFormComponent
} from './house-page';

const routes: Routes = [
  { path: '', redirectTo: 'form' },
  { path: '', component: HousePageComponent, children: [
    { path: 'form',     component: HouseFormComponent },
    { path: 'complete', component: HouseCompleteComponent },
    { path: 'vote',     component: VoteFormComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HouseRoutingModule { }
