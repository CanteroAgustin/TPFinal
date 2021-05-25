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

  turnos: Turnos[];
  user: User;

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.firestoreService.getTurnos().valueChanges().subscribe(response => {
      if (this.user.tipo === 'paciente') {
        this.turnos = response.filter(data=> data.paciente === this.user.uid);
      } else if (this.user.tipo === 'especialista') {
        this.turnos = response.filter(data=> data.paciente === this.user.uid);
      }
    });
  }

}
