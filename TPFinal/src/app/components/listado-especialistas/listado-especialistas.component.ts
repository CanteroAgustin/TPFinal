import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Especialidad } from 'src/app/models/especialidad';
import { User } from 'src/app/models/user';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';

@Component({
  selector: 'app-listado-especialistas',
  templateUrl: './listado-especialistas.component.html',
  styleUrls: ['./listado-especialistas.component.scss']
})
export class ListadoEspecialistasComponent implements OnInit {

  filtroPorEsp = [];
  especialistasConAgenda = [];
  @Output() onEspecialistaSelected = new EventEmitter<{especialista: User, especialidad: Especialidad}>();

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.firestoreService.getEspecialistasConAgenda().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.especialistasConAgenda.push(doc.data());
        this.filtroPorEsp = [...this.especialistasConAgenda];
      });
    }).catch((error) => {
      console.log("Error getting documents: ", error);
    });

  }

  onSeleccionarEspecialidad(especialista, especialidad) {
    this.onEspecialistaSelected.emit({especialista, especialidad});
  }

  handleOnEspFiltrados(esp){
    this.filtroPorEsp.splice(0, this.filtroPorEsp.length, ...esp);
  }

}
