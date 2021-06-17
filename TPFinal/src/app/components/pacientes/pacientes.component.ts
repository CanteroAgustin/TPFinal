import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit {

  user: User;
  pacientes = [];
  turnos = [];
  @Output() onPacienteSelected = new EventEmitter<User>();

  constructor(private firestoreService: FirestoreService, private router: Router, private pacienteService: PacienteService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.firestoreService.getTurnos().valueChanges().subscribe(response => {
      response.forEach(turno => {
        if (this.user.uid === turno.especialista.uid && turno.estado !== 'En espera' && turno.estado !== 'Cancelado' && turno.estado !== 'Rechazado') {
          this.pacientes.push(turno.paciente);
        }
      });
    });
  }

  verHistoriaPaciente(paciente: User) {
    this.pacienteService.setPaciente(paciente);
    this.router.navigate(['home', 'historia-clinica']);
  }
}
