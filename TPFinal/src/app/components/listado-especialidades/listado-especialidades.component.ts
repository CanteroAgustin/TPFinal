import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Especialidad } from 'src/app/models/especialidad';

@Component({
  selector: 'app-listado-especialidades',
  templateUrl: './listado-especialidades.component.html',
  styleUrls: ['./listado-especialidades.component.scss']
})
export class ListadoEspecialidadesComponent implements OnInit {

  @Input() especialidades;
  @Output() onEspecialidadSelected = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  especialidadSelected(especialidad){
    this.onEspecialidadSelected.emit(especialidad);
  }
}
