import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo
} from '@angular/fire/auth-guard';
import { AdminPageComponent } from './admin-page/admin-page.component';
import {
  LoginComponent,
  PasswordChangeComponent,
  ContactsComponent,
  HousePageComponent,
  HouseDetailPageComponent,
  VotingPageComponent
} from './admin-page';

const toLogin = () => redirectUnauthorizedTo(['admin', 'login']);

const routes: Routes = [
  { path: '', redirectTo: 'houses', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: toLogin },
    component: AdminPageComponent,
    children: [
      { path: 'houses', component: HousePageComponent, pathMatch: 'full' },
      { path: 'houses/:num', component: HouseDetailPageComponent },
      { path: 'contacts', component: ContactsComponent },
      { path: 'votes', component: VotingPageComponent },
      { path: 'password', component: PasswordChangeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
