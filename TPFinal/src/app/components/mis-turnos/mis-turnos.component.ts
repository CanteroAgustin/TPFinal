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
  user: User;

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.firestoreService.getTurnosParaEspecialista(this.user.uid).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.turnos.push(doc.data());
      });
    }
    );
  }
  cancelarTurno(turno){
    turno.estado = 'Cancelado';
    this.firestoreService.actualizarTurno(turno.uid, turno);
  }
}
