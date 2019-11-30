import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { LoginComponent, PasswordChangeComponent, ContactsComponent, HousePageComponent, HouseDetailPageComponent } from './admin-page';
import { AuthGuard } from './auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'contacts', pathMatch: 'full' },
  { path: '', component: AdminPageComponent, children: [
    { path: 'login',    component: LoginComponent },
    { path: 'password', canActivate: [AuthGuard], component: PasswordChangeComponent },
    { path: 'contacts', canActivate: [AuthGuard], component: ContactsComponent },
    { path: 'houses', canActivate: [AuthGuard], component: HousePageComponent, pathMatch: 'full' },
    { path: 'houses/:num', canActivate: [AuthGuard], component: HouseDetailPageComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
