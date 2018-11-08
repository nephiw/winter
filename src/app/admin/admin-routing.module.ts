import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { LoginComponent, PasswordChangeComponent, ContactsComponent } from './admin-page';

const routes: Routes = [
  { path: '', redirectTo: 'login' },
  { path: '', component: AdminPageComponent, children: [
    { path: 'login',    component: LoginComponent },
    { path: 'password', component: PasswordChangeComponent },
    { path: 'contacts', component: ContactsComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
