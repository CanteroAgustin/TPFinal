import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  paciente;

  constructor() { }

  getPaciente(){
    return this.paciente;
  }

  setPaciente(paciente: User){
    this.paciente = paciente;
  }
}
