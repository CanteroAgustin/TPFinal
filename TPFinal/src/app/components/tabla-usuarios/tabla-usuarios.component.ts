import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.scss']
})
export class TablaUsuariosComponent implements OnInit {

  usuarios: User[] = [];
  constructor(private firestorService: FirestoreService) { }

  ngOnInit(): void {
    this.firestorService.getAllUsers().valueChanges().subscribe(response => {
      this.usuarios = response;
    });
  }

  onHabilitarHandler(usuario: User) {
    this.usuarios.forEach(element => {
      if (element['uid'] === usuario['uid']) {
        element.habilitado = true;
        this.firestorService.actualizarUsuarios(usuario['uid'], usuario).then(response => {
          console.log(response);
        });
      };
    });
  }
}
