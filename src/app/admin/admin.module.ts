import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminService } from './admin.service';
import { AuthService } from './auth.service';
import { LoginComponent } from './admin-page/login/login.component';
import { ContactsComponent, ContactsTableComponent, PasswordChangeComponent } from './admin-page';

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
    AuthService
  ]
})
export class AdminModule { }
