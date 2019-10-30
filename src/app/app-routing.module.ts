import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'house', loadChildren: () => import('./house/house.module').then(m => m.HouseModule) },
  { path: 'donate', loadChildren: () => import('./donate/donate.module').then(m => m.DonateModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
