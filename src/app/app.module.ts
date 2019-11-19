import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule, FirebaseOptionsToken } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { ToastrModule } from 'ngx-toastr';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import 'hammerjs';
import 'mousetrap';

import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { SharedModule } from './common/shared.module';
const { firebase } = environment;

export function windowFactory() {
  return window;
}

export function documentFactory() {
  return document;
}

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
    }),
    GalleryModule.forRoot()
  ],
  providers: [
    { provide: 'Window', useFactory: windowFactory },
    { provide: 'Document', useFactory: documentFactory },
    // this is required to get AOT working
    { provide: FirebaseOptionsToken, useValue: firebase.default }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
