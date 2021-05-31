import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Turnos } from 'src/app/models/turnos';

@Component({
  selector: 'app-turnos-especialidad',
  templateUrl: './turnos-especialidad.component.html',
  styleUrls: ['./turnos-especialidad.component.scss']
})
export class TurnosEspecialidadComponent implements OnInit {

  user;
  @Input() especialistasParaEsp = [];
  @Input() especialidadSeleccionada;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  armarTurno(especialista, dia, hora) {
    delete especialista.agendaQuincenal;
    let turno = new Turnos;
    turno.dia = dia.dia;
    turno.diaNombre = dia.nombre;
    turno.mes = dia.mes;
    turno.especialista = especialista;
    turno.hora = hora;
    turno.paciente = this.user;
    turno.especialidad = this.especialidadSeleccionada;
    turno.estado = 'En espera';
    this.router.navigate(['solicitarTurnoResumen'], { queryParams: { turno: JSON.stringify(turno) }, relativeTo: this.route });
  }

}
