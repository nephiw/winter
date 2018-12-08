import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { StorageServiceModule } from 'ngx-webstorage-service';
import { ToastrModule } from 'ngx-toastr';
import { ModalGalleryModule } from '@ks89/angular-modal-gallery';
import 'hammerjs';
import 'mousetrap';

import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
const { firebase } = environment;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(firebase),
    AngularFireAuthModule,
    HomeModule,
    StorageServiceModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-full-width',
      preventDuplicates: true,
    }),
    ModalGalleryModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
