import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule, FirebaseOptionsToken } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { SharedModule } from './common/shared.module';
const firebase = environment.firebase;

export function windowFactory() {
  return window;
}

export function documentFactory() {
  return document;
}

const dateBuilder = {
  build: (params?: any) => (params ? new Date(params) : new Date())
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireModule,
    AngularFireAuthModule,
    HomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-full-width',
      preventDuplicates: true
    })
  ],
  providers: [
    { provide: 'Window', useFactory: windowFactory },
    { provide: 'Document', useFactory: documentFactory },
    { provide: 'DateBuilder', useValue: dateBuilder },
    // this is required to get AOT working
    { provide: FirebaseOptionsToken, useValue: firebase }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
