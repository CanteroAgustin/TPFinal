import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { PageNoTFoundComponent } from './components/page-no-tfound/page-no-tfound.component';
import { SignUpComponent } from './components/autenticacion/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/autenticacion/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/autenticacion/verify-email/verify-email.component';
import { SignInComponent } from './components/autenticacion/sign-in/sign-in.component';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';


@NgModule({
  declarations: [
    AppComponent,
    PageNoTFoundComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    PageNoTFoundComponent,
    BienvenidaComponent,
    BienvenidaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
