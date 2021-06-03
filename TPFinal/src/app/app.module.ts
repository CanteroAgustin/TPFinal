import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { HomeComponent } from './components/home/home.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { TablaUsuariosComponent } from './components/tabla-usuarios/tabla-usuarios.component';
import { SortDirective } from './directives/sort.directive';
import { PerfilComponent } from './components/perfil/perfil.component';
import { SolicitarTurnoComponent } from './components/solicitar-turno/solicitar-turno.component';
import { AgendaComponent } from './components/agenda/agenda.component';
import { SolicitudTurnoResumenComponent } from './components/solicitud-turno-resumen/solicitud-turno-resumen.component';
import { MisTurnosComponent } from './components/mis-turnos/mis-turnos.component';
import { RecaptchaModule, RecaptchaFormsModule } from "ng-recaptcha";
import { ListadoEspecialidadesComponent } from './components/listado-especialidades/listado-especialidades.component';
import { TurnosEspecialidadComponent } from './components/turnos-especialidad/turnos-especialidad.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { ListadoEspecialistasComponent } from './components/listado-especialistas/listado-especialistas.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNoTFoundComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    PageNoTFoundComponent,
    HomeComponent,
    UsuariosComponent,
    TablaUsuariosComponent,
    SortDirective,
    PerfilComponent,
    SolicitarTurnoComponent,
    AgendaComponent,
    SolicitudTurnoResumenComponent,
    MisTurnosComponent,
    ListadoEspecialidadesComponent,
    TurnosEspecialidadComponent,
    BusquedaComponent,
    BienvenidaComponent,
    ListadoEspecialistasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
