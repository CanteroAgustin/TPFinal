import { EventEmitter, Injectable, NgZone, Output } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import firebase from 'firebase/app';
import { User as UserSistema } from 'src/app/models/user';
import { FirestoreService } from './firestore.service';

export interface User {
  uid: string;
  email: string;
  emailVerified: boolean;
  nombre: string;
  apellido: string,
  edad: string,
  dni: string,
  especialidad: string,
  obraSocial: string,
  password: string,
  perfil1: string,
  perfil2: string,
  tipo: string,
  habilitado: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userState: any;
  @Output() errorMsg = new EventEmitter<string>();

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private firestoreService: FirestoreService
  ) {
    // this.afAuth.authState.subscribe(user => {
    //   if (user && user.emailVerified) {
    //     this.userState = user;
    //     localStorage.setItem('user', JSON.stringify(this.userState));
    //   } else {
    //     localStorage.removeItem('user')
    //   }
    // })
  }

  SignIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user.emailVerified) {
          let userCompleto;
          this.firestoreService.getUserCompleto(result.user.uid).subscribe((doc) => {
            if (doc.exists) {
              userCompleto = doc.data();
              if (userCompleto && userCompleto.habilitado) {
                this.SetUserData(result.user || this.userState, userCompleto);
                this.ngZone.run(() => {
                  this.router.navigate(['home']);
                });
              } else {
                userCompleto.emailVerified = true;
                this.firestoreService.actualizarUsuarios(userCompleto.uid, userCompleto);
                console.log("El usuario no esta habilitado!");
                this.errorMsg.emit('Tu usuario no esta habilitado, por favor contactate con un administrador.');
              }
            } else {
              console.log("No se encontro el usuario!");
            }
          }), error => {
            console.log("Error getting document:", error);
          };
        } else {
          this.errorMsg.emit('Tu email no esta verificado, por favor revisa la bandeja de tu correo.');
        }
      }).catch((error) => {
        switch (error.code) {
          case 'auth/user-not-found':
            this.errorMsg.emit('El email ingresado no existe.');
            break;
          case 'auth/wrong-password':
            this.errorMsg.emit('La contraseña ingresada es incorrecta.');
            break;
          case 'auth/invalid-email':
            this.errorMsg.emit('El email ingresado tiene un formato incorrecto.');
            break;
          default:
            this.errorMsg.emit(error.message);
        }
        console.log('Error: ' + error.message);
      })
  }

  SignUp(form, file1, file2) {
    return this.afAuth.createUserWithEmailAndPassword(form.emailControl, form.passwordControl)
      .then((result) => {
        if (file1) {
          const storageRef = firebase.storage().ref(`user/perfil1/${result.user.uid}-${file1.name}`);
          storageRef.put(file1).then(snapshot => {
            console.log(snapshot);
          });
        }
        if (file2) {
          const storageRef2 = firebase.storage().ref(`user/perfil2/${result.user.uid}-${file2.name}`);
          storageRef2.put(file2).then(snapshot => {
            console.log(snapshot);
          });
        }
        let userCompleto = new UserSistema;
        userCompleto.nombre = form.nombreControl;
        userCompleto.apellido = form.apellidoControl;
        userCompleto.edad = form.edadControl;
        userCompleto.dni = form.dniControl;
        userCompleto.email = form.emailControl;
        userCompleto.especialidad = form.especialidadesControl;
        userCompleto.obraSocial = form.obraSocialControl;
        userCompleto.password = form.passwordControl;
        userCompleto.perfil1 = file1.name;
        userCompleto.perfil2 = file2 ? file2.name : '';
        userCompleto.tipo = form.tipoControl;
        userCompleto['habilitado'] = form.tipoControl === 'especialista' ? false : true;
        this.SendVerificationMail(userCompleto);
        this.SetUserData(result.user || this.userState, userCompleto);
      }).catch((error) => {
        console.log('Error: ' + error.message);
      })
  }

  SendVerificationMail(userCompleto?) {
    return this.afAuth.currentUser
      .then(u => {
        if (u) {
          u.sendEmailVerification()
        }
      })
      .then(() => {
        if (userCompleto && userCompleto.tipo === 'admin') {
          this.router.navigate(['home', 'usuarios']);
        } else {
          this.router.navigate(['home']);
        }
      })
  }

  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        console.log('El correo de recuperacion fue enviado.');
        //this.openSnackBar('El correo de recuperacion fue enviado, revisa tu bandeja');
      }).catch((error) => {
        console.log('Error: ' + error.message);
        //this.openSnackBar('Error: ' + error.message);
      })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || "{}");
    return (user && user.emailVerified && user.habilitado) ? true : false;
  }

  SetUserData(user: firebase.User, userCompleto?) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userState: User = {
      uid: user.uid,
      email: user.email || userCompleto.email,
      emailVerified: user.emailVerified,
      nombre: userCompleto.nombre,
      apellido: userCompleto.apellido,
      edad: userCompleto.edad,
      dni: userCompleto.dni,
      especialidad: userCompleto.especialidad ? userCompleto.especialidad : null,
      obraSocial: userCompleto.obraSocial ? userCompleto.obraSocial : null,
      password: userCompleto.password,
      perfil1: userCompleto.perfil1 ? userCompleto.perfil1 : null,
      perfil2: userCompleto.perfil2 ? userCompleto.perfil2 : null,
      tipo: userCompleto.tipo,
      habilitado: userCompleto.tipo === 'especialista' && !userCompleto.uid ? false : true
    }

    if (userState.emailVerified) {
      localStorage.setItem('user', JSON.stringify(userState));
    }

    return userRef.set(userState, {
      merge: true
    })
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }
}