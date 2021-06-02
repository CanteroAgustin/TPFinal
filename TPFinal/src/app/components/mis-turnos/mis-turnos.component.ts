import { Component, OnInit } from '@angular/core';
import { Turnos } from 'src/app/models/turnos';
import { User } from 'src/app/models/user';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss']
})
export class MisTurnosComponent implements OnInit {

  turnos = [];
  turnosAListar: Turnos[]
  user: User;
  tipo;

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.tipo = this.user.tipo;
    if (this.tipo === 'paciente') {
      this.firestoreService.getTurnosDePeciente(this.user.uid).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.turnos.push(doc.data());
        });
        this.turnosAListar = [...this.turnos];
      });
    }

    if (this.tipo === 'especialista') {
      this.firestoreService.getTurnosDeEspecialista(this.user.uid).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.turnos.push(doc.data());
        });
        this.turnosAListar = [...this.turnos];
      });
    }

    if (this.tipo === 'admin') {
      this.firestoreService.getTurnos().valueChanges().subscribe(response => {
          this.turnos = [...response];
        this.turnosAListar = [...this.turnos];
      });
    }
  }

  cancelarTurno(turno) {
    turno.estado = 'Cancelado';
    this.firestoreService.actualizarTurno(turno.uid, turno);
  }

  rechazarTurno(turno) {
    turno.estado = 'Rechazado';
    this.firestoreService.actualizarTurno(turno.uid, turno);
  }

  aceptarTurno(turno) {
    turno.estado = 'Aceptado';
    this.firestoreService.actualizarTurno(turno.uid, turno);
  }

  finalizarTurno(turno) {
    turno.estado = 'Finalizado';
    this.firestoreService.actualizarTurno(turno.uid, turno);
  }

  handleOnturnosFiltrados(turnos: Turnos[]) {
    this.turnosAListar.splice(0, this.turnosAListar.length, ...turnos);
  }
}
