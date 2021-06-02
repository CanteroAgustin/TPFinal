import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/storage';
import { AuthService } from 'src/app/services/firebase/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userCompleto;
  storageRef;
  seleccionInicial;
  menuNuevoTurno = '';

  constructor(public authService: AuthService, public router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.userCompleto = JSON.parse(localStorage.getItem('user'));
    if (this.userCompleto.tipo === 'admin' && this.router.url === '/home') {
      this.router.navigate(['usuarios'], { relativeTo: this.activatedRoute })
    }
  }

  onSeleccionInicial(accion) {
    this.seleccionInicial = accion;
    switch (accion) {
      case 'solicitar':
        this.router.navigate(['solicitarTurno'], { relativeTo: this.activatedRoute });
        break;
      case 'ver':
        this.router.navigate(['misTurnos'], { relativeTo: this.activatedRoute });
        break;
      case 'agenda':
        this.router.navigate(['agenda'], { relativeTo: this.activatedRoute });
        break;
    }
  }
}
