import { Component, NgZone, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-perfil-fab',
  templateUrl: './perfil-fab.component.html',
  styleUrls: ['./perfil-fab.component.scss']
})
export class PerfilFabComponent implements OnInit {

  pacientes = [];
  toogle = false;
  loading = false;
  fileName = '-Turnos.xlsx';

  constructor(private firestoreService: FirestoreService, public ngZone: NgZone) {
    this.loading = true;
    this.firestoreService.getPacientes().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.pacientes.push(doc.data());
      });

      this.pacientes.forEach(paciente => {
        paciente['turnos'] = [];
        let query = this.firestoreService.getTurnosDePeciente(paciente.uid);
        query.onSnapshot((querySnapshot) => {
          paciente.turnos.splice(0, paciente.turnos.length);
          querySnapshot.forEach((doc) => {
            paciente.turnos.push(doc.data());
          });
          this.ngZone.run(() => {
            this.loading = false;
          });
        });
      });

    }).catch((error) => {
      console.log("Error getting documents: ", error);
    });
  }

  ngOnInit(): void {
  }

  exportarAExcel(paciente){
    const turnos = [];
    paciente.turnos.forEach(element => {
      let turno = {hora: String, dia: String, diaDescripcion: String, mes: String, estado: String, motivoCancelacion: String, motivoRechazo: String, especialidad: String, nombreEspecialista: new String};
      turno.hora = element.hora;
      turno.dia = element.dia;
      turno.diaDescripcion = element.diaNombre;
      turno.mes = element.mes;
      turno.estado = element.estado;
      if(element.motivoCancelacion){
        turno.motivoCancelacion = element.motivoCancelacion;
      }
      if(element.motivoRechazo){
        turno.motivoRechazo = element.motivoRechazo;
      }
      turno.especialidad = element.especialidad.descripcion;
      turno.nombreEspecialista = element.especialista.nombre+' '+element.especialista.apellido;
      turnos.push(turno);
    });
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(turnos);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, paciente.nombre+'-'+paciente.apellido+'-'+this.fileName);
  }
}
