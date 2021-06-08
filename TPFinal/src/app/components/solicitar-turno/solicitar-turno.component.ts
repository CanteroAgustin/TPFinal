import { Component, OnInit } from '@angular/core';
import { Especialidad } from 'src/app/models/especialidad';
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
  pacientes = [];
  especialistas;
  especialidades: Especialidad[] = [];
  especialidadSeleccionada;
  especialistasParaEsp;
  user: User;
  turnosUser: Turnos[];
  especialistasConAgenda = [];
  seleccionInicial = '';
  esAdmin;
  usuarioEstaSeleccionado = true;
  pacienteSeleccionado: User;

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.firestoreService.getEspecialistasConAgenda().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.especialistasConAgenda.push(doc.data());
        this.especialistasConAgenda.forEach(especialistaConAgenda => {
          especialistaConAgenda.especialidades.forEach(especialidad => {
            let existe = false;
            this.especialidades.forEach(esp => {
              if (esp.descripcion === especialidad.descripcion) {
                existe = true;
              }
            });
            if (!existe) {
              this.especialidades.push(especialidad);
            }
          });
        });
      });
    }).catch((error) => {
      console.log("Error getting documents: ", error);
    });

    this.esAdmin = this.user.tipo === 'admin' ? true : false;

    if (this.esAdmin) {
      this.usuarioEstaSeleccionado = false;
      this.firestoreService.getPacientes().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.pacientes.push(doc.data());
        });
      }).catch((error) => {
        console.log("Error getting documents: ", error);
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

      let agenda = especialista.agenda ? especialista.agenda : null;
      if (agenda) {
        agenda.forEach(dia => {
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
              agendaQuincenal.push({ dia: newDate.getDate(), mes: meses[newDate.getMonth()], nombre: days[newDate.getDay()], turnos: turnos });
            });
          }
        });
      }
      if (day === 6) { day = -1 };
    }
    return agendaQuincenal;
  }

  handleEspecialistaSelected(event) {
    this.especialistasParaEsp = [];
    let esp = event.especialista
    esp.agendaQuincenal = this.armarAgenda(esp);
    setTimeout(() => {
      this.especialistasParaEsp.push(esp);
      this.especialidadSeleccionada = event.especialidad;
    }, 1000);
  }

  handleEspecialidadSelected(especialidadSeleccionada) {
    this.especialidadSeleccionada = especialidadSeleccionada;
    this.seleccionInicial = '';
    this.especialistasParaEsp = this.especialistasConAgenda.filter(especialista => {
      let devolver = false;
      especialista.especialidades.forEach(especialidad => {
        if (especialidad.descripcion === especialidadSeleccionada.descripcion) {
          devolver = true;
        }
      });
      return devolver;
    });
    this.especialistasParaEsp.forEach(esp => {
      esp.agendaQuincenal = this.armarAgenda(esp);
    });
  }

  onSeleccionInicial(tipo) {
    this.seleccionInicial = tipo;
  }

  seleccionarPaciente(paciente) {
    this.usuarioEstaSeleccionado = true;
    this.pacienteSeleccionado = paciente;
  }
}
