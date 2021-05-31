import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Turnos } from 'src/app/models/turnos';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';

@Component({
  selector: 'app-solicitud-turno-resumen',
  templateUrl: './solicitud-turno-resumen.component.html',
  styleUrls: ['./solicitud-turno-resumen.component.scss']
})
export class SolicitudTurnoResumenComponent implements OnInit {

  turno: Turnos;
  constructor(private router: Router, private route: ActivatedRoute, private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.turno = JSON.parse(params['turno']);
      console.log(this.turno);
    });
  }

  confirmarTurno() {
    this.firestoreService.saveTurno(this.turno).then(
      doc => {
        this.turno.uid = doc.id;
        this.firestoreService.actualizarTurno(this.turno.uid, this.turno);
      }
    );
    this.router.navigate(['home', 'misTurnos']);
  }
}
