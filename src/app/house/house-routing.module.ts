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
import { DetailPageGuard } from './guards/detail-page.guard';

const routes: Routes = [
  { path: '', redirectTo: 'vote' },
  { path: '', component: HousePageComponent, children: [
    { path: 'form', component: HouseFormComponent },
    { path: 'complete', component: HouseCompleteComponent },
    { path: 'ended', component: HouseEndedComponent },
    { path: 'vote', component: VoteFormComponent },
    { path: ':entry', component: DetailPageComponent, canActivate: [DetailPageGuard] }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HouseRoutingModule { }
