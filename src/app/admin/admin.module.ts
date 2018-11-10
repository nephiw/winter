import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './admin-page/login/login.component';
import { AdminService } from './admin.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import {
  ContactsComponent,
  ContactsTableComponent,
  PasswordChangeComponent,
  AdminPageComponent
} from './admin-page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ],
  declarations: [
    ContactsComponent,
    ContactsTableComponent,
    LoginComponent,
    PasswordChangeComponent,
    AdminPageComponent,
    LoginComponent
  ],
  providers: [
    AdminService,
    AuthService,
    AuthGuard
  ]
})
export class AdminModule { }
