import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
  { path: 'house', loadChildren: './house/house.module#HouseModule' },
  { path: 'donate', loadChildren: './donate/donate.module#DonateModule' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
