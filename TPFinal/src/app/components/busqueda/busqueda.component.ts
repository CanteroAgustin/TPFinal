import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Especialidad } from 'src/app/models/especialidad';
import { Turnos } from 'src/app/models/turnos';
import { User } from 'src/app/models/user';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent implements OnInit {

  @Input() tipo;
  @Input() filtroPorEsp: User[];
  @Input() turnosAFiltrar: Turnos[];
  @Output() onTurnosFiltrados = new EventEmitter<Turnos[]>()
  @Output() onEspFiltrados = new EventEmitter<User[]>()

  especialidades: Especialidad[];
  turnosFiltrados: Turnos[];
  espFiltrados: User[];

  medicoControl = new FormControl('');
  pacienteControl = new FormControl('');
  especialidadControl = new FormControl('');

  busquedaForm = new FormGroup({
    medicoControl: this.medicoControl,
    pacienteControl: this.pacienteControl,
    especialidadControl: this.especialidadControl
  });

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.firestoreService.getAllEspecialidades().valueChanges().subscribe(response => {
      this.especialidades = response;
    });
    console.log()
  }

  submitSearchForm() {
    if (this.especialidadControl.value) {
      if (this.filtroPorEsp) {
        this.espFiltrados = this.filtroPorEsp.filter(esp => {
          let coincide = false;
          esp.especialidades.forEach(especialidad => {
            let espSinTildesYLowerCase = this.removeAccents(especialidad.descripcion).toLowerCase();
            let espABuscarSinTildesYLowerCase = this.removeAccents(this.especialidadControl.value).toLowerCase();
            if(espSinTildesYLowerCase.includes(espABuscarSinTildesYLowerCase)){
              coincide = true;
            }
          });
          return coincide;
        });
      } else {
        this.turnosFiltrados = this.turnosAFiltrar.filter(turno => {
          let espSinTildesYLowerCase = this.removeAccents(turno.especialidad.descripcion).toLowerCase();
          let espABuscarSinTildesYLowerCase = this.removeAccents(this.especialidadControl.value).toLowerCase();
          return espSinTildesYLowerCase.includes(espABuscarSinTildesYLowerCase);
        });
      }
    }
    if (this.medicoControl.value) {
      if (this.filtroPorEsp) {
        this.espFiltrados = this.filtroPorEsp.filter(esp => {
          let docSinTildesYLowerCase = this.removeAccents(esp.nombre + esp.apellido).toLowerCase();
          let docABuscarSinTildesYLowerCase = this.removeAccents(this.medicoControl.value).toLowerCase();
          return docSinTildesYLowerCase.includes(docABuscarSinTildesYLowerCase);
        });
      } else {
        this.turnosFiltrados = this.turnosAFiltrar.filter(turno => {
          let docSinTildesYLowerCase = this.removeAccents(turno.especialista.nombre + turno.especialista.apellido).toLowerCase();
          let docABuscarSinTildesYLowerCase = this.removeAccents(this.medicoControl.value).toLowerCase();
          return docSinTildesYLowerCase.includes(docABuscarSinTildesYLowerCase);
        });
      }
    }
    if (this.pacienteControl.value) {
      this.turnosFiltrados = this.turnosAFiltrar.filter(turno => {
        let pacSinTildesYLowerCase = this.removeAccents(turno.paciente.nombre + turno.paciente.apellido).toLowerCase();
        let pacABuscarSinTildesYLowerCase = this.removeAccents(this.pacienteControl.value).toLowerCase();
        return pacSinTildesYLowerCase.includes(pacABuscarSinTildesYLowerCase);
      });
    }
    if (this.filtroPorEsp) {
      this.onEspFiltrados.emit(this.espFiltrados);
      this.espFiltrados.splice(0, this.espFiltrados.length, ...this.filtroPorEsp);
    } else {
      this.onTurnosFiltrados.emit(this.turnosFiltrados);
      this.turnosFiltrados.splice(0, this.turnosFiltrados.length, ...this.turnosAFiltrar);
    }

  }

  removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

}
