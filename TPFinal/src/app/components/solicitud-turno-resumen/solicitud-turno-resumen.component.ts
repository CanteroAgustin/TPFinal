import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Turnos } from 'src/app/models/turnos';

@Component({
  selector: 'app-solicitud-turno-resumen',
  templateUrl: './solicitud-turno-resumen.component.html',
  styleUrls: ['./solicitud-turno-resumen.component.scss']
})
export class SolicitudTurnoResumenComponent implements OnInit {

  turno: Turnos;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.turno = JSON.parse(params['turno']);
      console.log(this.turno);
    });
  }
}
