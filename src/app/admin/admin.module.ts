import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './admin-page/login/login.component';
import { AdminService } from './admin.service';
import { AuthService } from './auth.service';
import {
  ContactsComponent,
  ContactsTableComponent,
  PasswordChangeComponent,
  AdminPageComponent,
  HouseTableComponent,
  HousePageComponent,
  PhotoEditorComponent,
  HouseDetailPageComponent,
  NumberInputComponent,
  LoadingComponent
} from './admin-page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule
  ],
  declarations: [
    ContactsComponent,
    ContactsTableComponent,
    LoginComponent,
    PasswordChangeComponent,
    AdminPageComponent,
    LoginComponent,
    LoadingComponent,
    HouseTableComponent,
    HousePageComponent,
    PhotoEditorComponent,
    HouseDetailPageComponent,
    NumberInputComponent
  ],
  providers: [
    AdminService,
    AuthService
  ]
})
export class AdminModule { }
