import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Turnos } from 'src/app/models/turnos';
import { User } from 'src/app/models/user';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss']
})
export class MisTurnosComponent implements OnInit {

  turnos = [];
  turnosAListar: Turnos[]
  user: User;
  tipo;
  turno: Turnos;

  @ViewChild('modalMensaje') modal: ElementRef;
  @ViewChild('modalMensaje2') modal2: ElementRef;
  @ViewChild('modalCalificacion') modalCalificacion: ElementRef;
  @ViewChild('modalCancelar') modalCancelar: ElementRef;
  @ViewChild('modalRechazar') modalRechazar: ElementRef;

  diagnosticoCtrl = new FormControl('', Validators.required);
  resenaCtrl = new FormControl('', Validators.required);
  calificacionCtrl = new FormControl('', [Validators.required, Validators.minLength(4)]);
  motivoCancelacionCtrl = new FormControl('', [Validators.required, Validators.minLength(4)]);
  motivoRechazoCtrl = new FormControl('', [Validators.required, Validators.minLength(4)]);

  modalCancelarFormGroup = new FormGroup({
    motivoCancelacionCtrl: this.motivoCancelacionCtrl
  });

  modalRechazarFormGroup = new FormGroup({
    motivoRechazoCtrl: this.motivoRechazoCtrl
  });

  modalFormGroup = new FormGroup({
    diagnosticoCtrl: this.diagnosticoCtrl,
    resenaCtrl: this.resenaCtrl
  });

  modalCalificacionFormGroup = new FormGroup({
    calificacionCtrl: this.calificacionCtrl
  });

  constructor(private firestoreService: FirestoreService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.tipo = this.user.tipo;
    if (this.tipo === 'paciente') {
      this.firestoreService.getTurnosDePeciente(this.user.uid).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.turnos.push(doc.data());
        });
        this.turnosAListar = [...this.turnos];
      });
    }

    if (this.tipo === 'especialista') {
      this.firestoreService.getTurnosDeEspecialista(this.user.uid).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.turnos.push(doc.data());
        });
        this.turnosAListar = [...this.turnos];
      });
    }

    if (this.tipo === 'admin') {
      this.firestoreService.getTurnos().valueChanges().subscribe(response => {
        this.turnos = [...response];
        this.turnosAListar = [...this.turnos];
      });
    }
  }

  cancelarTurno(turno) {
    this.turno = turno;
    this.modalService.open(this.modalCancelar);
  }

  rechazarTurno(turno) {
    this.turno = turno;
    this.modalService.open(this.modalRechazar);
  }

  aceptarTurno(turno) {
    turno.estado = 'Aceptado';
    this.firestoreService.actualizarTurno(turno.uid, turno);
  }

  finalizarTurno(turno) {
    this.turno = turno;
    this.modalService.open(this.modal);
  }

  guardarModal() {
    this.turno.estado = 'Finalizado';
    this.turno.diagnostico = this.diagnosticoCtrl.value;
    this.turno.reseña = this.resenaCtrl.value;
    this.firestoreService.actualizarTurno(this.turno.uid, this.turno);
    this.modalService.dismissAll();
  }

  handleOnturnosFiltrados(turnos: Turnos[]) {
    this.turnosAListar.splice(0, this.turnosAListar.length, ...turnos);
  }

  verResena(turno) {
    this.turno = turno;
    this.modalService.open(this.modal2);
  }

  CerrarModal() {
    this.modalService.dismissAll();
  }

  verCalificacion(turno) {
    this.turno = turno;
    this.modalService.open(this.modalCalificacion);
  }

  guardarModalCalificacion() {
    this.turno.calificacion = this.calificacionCtrl.value;
    this.firestoreService.actualizarTurno(this.turno.uid, this.turno);
    this.modalService.dismissAll();
  }

  guardarModalCancelacion() {
    this.turno.estado = 'Cancelado';
    this.turno.motivoCancelacion = this.motivoCancelacionCtrl.value;
    this.firestoreService.actualizarTurno(this.turno.uid, this.turno);
    this.modalService.dismissAll();
  }

  guardarModalRechazo() {
    this.turno.estado = 'Rechazado';
    this.turno.motivoRechazo = this.motivoRechazoCtrl.value;
    this.firestoreService.actualizarTurno(this.turno.uid, this.turno);
    this.modalService.dismissAll();
  }

  verEncuesta(turno) {

  }
}
