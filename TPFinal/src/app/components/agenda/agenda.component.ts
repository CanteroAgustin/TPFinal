import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {

  userCompleto;
  configurada = false;
  editar;
  dias = [];

  @ViewChild('lunes-mañana') lunesManana: ElementRef;

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    
    this.userCompleto = JSON.parse(localStorage.getItem('user'));
    this.configurada = this.userCompleto.agenda ? true : false;
    this.instanciarAgenda();
  }

  cargarAgenda() {
    this.editar = true;
  }

  guardarAgenda() {
    this.firestoreService.actualizarUsuarios(this.userCompleto.uid, this.userCompleto).then(() => {
      this.configurada = true;
      localStorage.setItem('user',JSON.stringify(this.userCompleto));
      this.editar = false;
    });
  }

  checkValue(event) {
    const partes = event.target.id.split('-');
    const nombre = partes[0];
    const turno = partes[1];
    let cheked = event.target.checked;
    this.userCompleto.agenda.forEach(dia => {
      if (nombre === dia.nombre) {
        switch (turno) {
          case 'mañana':
            dia.mañana = cheked;
            break;
          case 'tarde':
            dia.tarde = cheked;
            break;
          case 'noche':
            dia.noche = cheked;
            break;
        }
      }
    });
    console.log(this.userCompleto.agenda);
  }

  instanciarAgenda() {
    if (this.configurada) {
      this.editar = false;
    } else {
      this.dias.push({ nombre: 'lunes', mañana: false, tarde: false, noche: false });
      this.dias.push({ nombre: 'martes', mañana: false, tarde: false, noche: false });
      this.dias.push({ nombre: 'miercoles', mañana: false, tarde: false, noche: false });
      this.dias.push({ nombre: 'jueves', mañana: false, tarde: false, noche: false });
      this.dias.push({ nombre: 'viernes', mañana: false, tarde: false, noche: false });
      this.dias.push({ nombre: 'sabado', mañana: false, tarde: false, noche: false });
      this.dias.push({ nombre: 'domingo', mañana: false, tarde: false, noche: false });
      this.userCompleto.agenda = this.dias;
    }
  }

  onEditar(){
    this.editar = true;
  }
}
