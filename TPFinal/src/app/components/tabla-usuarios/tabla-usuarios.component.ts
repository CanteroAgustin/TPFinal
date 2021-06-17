import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { PacienteService } from 'src/app/services/paciente.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.scss']
})
export class TablaUsuariosComponent implements OnInit {

  usuarios: User[] = [];
  fileName = 'usuarios.xlsx';
  constructor(private firestorService: FirestoreService, private pacienteService: PacienteService, private router: Router) { }

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

  verHistoria(usuario) {
    this.pacienteService.setPaciente(usuario);
    this.router.navigate(['home', 'historia-clinica']);
  }

  exportarAExcel() {
    
    let element = document.getElementById('usuariosTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, this.fileName);
  }

}
