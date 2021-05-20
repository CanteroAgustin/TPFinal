import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './components/autenticacion/forgot-password/forgot-password.component';
import { SignInComponent } from './components/autenticacion/sign-in/sign-in.component';
import { SignUpComponent } from './components/autenticacion/sign-up/sign-up.component';
import { VerifyEmailComponent } from './components/autenticacion/verify-email/verify-email.component';
import { HomeComponent } from './components/home/home.component';
import { PageNoTFoundComponent } from './components/page-no-tfound/page-no-tfound.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'registro', component: SignUpComponent }
    ]
  },
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
