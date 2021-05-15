import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './components/autenticacion/forgot-password/forgot-password.component';
import { SignInComponent } from './components/autenticacion/sign-in/sign-in.component';
import { SignUpComponent } from './components/autenticacion/sign-up/sign-up.component';
import { VerifyEmailComponent } from './components/autenticacion/verify-email/verify-email.component';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { PageNoTFoundComponent } from './components/page-no-tfound/page-no-tfound.component';

const routes: Routes = [
  { path: '', redirectTo: '/bienvenida', pathMatch: 'full' },
  { path: 'bienvenida', component: BienvenidaComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'email-verification', component: VerifyEmailComponent },
  { path: '**', component: PageNoTFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
