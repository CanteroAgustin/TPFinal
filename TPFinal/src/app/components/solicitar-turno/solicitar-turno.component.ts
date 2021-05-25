import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Turnos } from 'src/app/models/turnos';
import { User } from 'src/app/models/user';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent implements OnInit {

  usuarios;
  pacientes;
  especialistas;
  especialidades;
  especialidadSeleccionada;
  especialistasParaEsp;
  user: User;
  turnosUser: Turnos[];

  constructor(private firestoreService: FirestoreService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.firestoreService.getAllUsers().valueChanges().subscribe(response => {
      this.usuarios = response;
      this.pacientes = this.usuarios.filter(usuario => {
        return usuario.tipo === 'paciente';
      })
      this.especialistas = this.usuarios.filter(usuario => {
        return usuario.tipo === 'especialista';
      })
      this.especialidades = this.especialistas.filter(esp => esp.agenda).map(a => a.especialidad);
    });
  }

  onChangeEspecialidad(especialidad) {
    this.especialidadSeleccionada = especialidad === 'Selecciona una especialidad' ? '' : especialidad;
    if (especialidad) {
      this.especialistasParaEsp = this.especialistas.filter(especialista => especialista.especialidad === especialidad);
      this.especialistasParaEsp.forEach(esp => {
        esp.agendaQuincenal = this.armarAgenda(esp);
      });
    }
  }

  armarAgenda(especialista) {
    let today = new Date();
    let day = today.getDay() - 1;
    let days = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
    let meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    let agendaQuincenal = [];
    for (let i = day; i < 16; i++) {
      day++;
      let newDate = new Date(today);
      newDate.setDate(newDate.getDate() + i - 1);

      let agenda = JSON.parse(especialista.agenda ? especialista.agenda : null);
      if (agenda) {
        agenda.dias.forEach(dia => {
          if (dia.nombre === days[day] && (dia.mañana || dia.tarde || dia.noche)) {
            let turnos = [];
            let hora;
            this.firestoreService.getTurnos().valueChanges().subscribe(response => {
              this.turnosUser = response;
              let mañana;
              let tarde;
              let noche;
              mañana = [
                { hora: '0800', tomado: false },
                { hora: '0900', tomado: false },
                { hora: '1000', tomado: false },
                { hora: '1100', tomado: false }
              ]
              tarde = [
                { hora: '1200', tomado: false },
                { hora: '1300', tomado: false },
                { hora: '1400', tomado: false },
                { hora: '1500', tomado: false }

              ]
              noche = [
                { hora: '1600', tomado: false },
                { hora: '1700', tomado: false },
                { hora: '1800', tomado: false },
                { hora: '1900', tomado: false }
              ]
              if (this.turnosUser.length > 0) {
                this.turnosUser.forEach(turno => {
                  if (turno.dia.toString() === newDate.getDate().toString() && turno.mes.toString() === meses[newDate.getMonth()]) {
                    hora = turno.hora;
                  }
                  
                  mañana.forEach(m => {
                    if (m.hora === hora) {
                      m.tomado = true;
                    }
                  });
                  tarde.forEach(t => {
                    if (t.hora === hora) {
                      t.tomado = true;
                    }
                  });
                  noche.forEach(n => {
                    if (n.hora === hora) {
                      n.tomado = true;
                    }
                  });

                });
              }

              if (dia.mañana) {
                turnos.push(mañana);
              }
              if (dia.tarde) {
                turnos.push(tarde);
              }
              if (dia.noche) {
                turnos.push(noche);
              }
              agendaQuincenal.push({ dia: newDate.getDate(), mes: meses[newDate.getMonth()], nombre: days[day], turnos: turnos });
            });
          }
        });
      }
      if (day === 6) { day = -1 };
    }
    return agendaQuincenal;
  }

  confirmarTurno(especialista, dia, hora) {
    let turno = new Turnos;
    turno.dia = dia.dia;
    turno.diaNombre = dia.nombre;
    turno.mes = dia.mes;
    turno.especialista = especialista.nombre + ' ' + especialista.apellido;
    turno.hora = hora;
    turno.paciente = this.user.uid;
    turno.especialistaUid = especialista.uid;
    turno.especialidad = this.especialidadSeleccionada;
    this.firestoreService.saveTurno(turno);
    this.router.navigate(['solicitarTurnoResumen'], { queryParams: { turno: JSON.stringify(turno) }, relativeTo: this.route });
  }
}
