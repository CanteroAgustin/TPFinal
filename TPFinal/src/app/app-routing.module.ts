import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaComponent } from './components/agenda/agenda.component';
import { ForgotPasswordComponent } from './components/autenticacion/forgot-password/forgot-password.component';
import { SignInComponent } from './components/autenticacion/sign-in/sign-in.component';
import { SignUpComponent } from './components/autenticacion/sign-up/sign-up.component';
import { VerifyEmailComponent } from './components/autenticacion/verify-email/verify-email.component';
import { HistoriaClinicaComponent } from './components/historia-clinica/historia-clinica.component';
import { HomeComponent } from './components/home/home.component';
import { MisTurnosComponent } from './components/mis-turnos/mis-turnos.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { PageNoTFoundComponent } from './components/page-no-tfound/page-no-tfound.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { SolicitarTurnoComponent } from './components/solicitar-turno/solicitar-turno.component';
import { SolicitudTurnoResumenComponent } from './components/solicitud-turno-resumen/solicitud-turno-resumen.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'registro', component: SignUpComponent },
      { path: 'perfil', component: PerfilComponent },
      {
        path: 'solicitarTurno', children: [
          { path: '', component: SolicitarTurnoComponent },
          { path: 'solicitarTurnoResumen', component: SolicitudTurnoResumenComponent }
        ]
      },
      { path: 'agenda', component: AgendaComponent },
      { path: 'misTurnos', component: MisTurnosComponent },
      { path: 'historia-clinica', component: HistoriaClinicaComponent },
      { path: 'pacientes', component: PacientesComponent }
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
