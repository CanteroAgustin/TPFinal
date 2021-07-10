import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Turnos } from 'src/app/models/turnos';
import { User } from 'src/app/models/user';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';

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
  users;

  @ViewChild('modalMensaje') modal: ElementRef;
  @ViewChild('modalMensaje2') modal2: ElementRef;
  @ViewChild('modalMensaje3') modal3: ElementRef;
  @ViewChild('modalCalificacion') modalCalificacion: ElementRef;
  @ViewChild('modalCancelar') modalCancelar: ElementRef;
  @ViewChild('modalRechazar') modalRechazar: ElementRef;
  @ViewChild('modalHistoria') modalHistoria: ElementRef;
  @ViewChild('modalEncuesta') modalEncuesta: ElementRef;

  diagnosticoCtrl = new FormControl('', Validators.required);
  resenaCtrl = new FormControl('', Validators.required);
  calificacionCtrl = new FormControl('', [Validators.required, Validators.minLength(4)]);
  motivoCancelacionCtrl = new FormControl('', [Validators.required, Validators.minLength(4)]);
  motivoRechazoCtrl = new FormControl('', [Validators.required, Validators.minLength(4)]);
  altura = new FormControl('', Validators.required);
  peso = new FormControl('', Validators.required);
  temperatura = new FormControl('', Validators.required);
  presion = new FormControl('', Validators.required);
  atencionPersonal = new FormControl('', Validators.required);
  atencionProfesional = new FormControl('', Validators.required);
  estadoClinica = new FormControl('', Validators.required);

  modalEncuestaFormGroup = new FormGroup({
    atencionPersonal: this.atencionPersonal,
    atencionProfesional: this.atencionProfesional,
    estadoClinica: this.estadoClinica
  });

  modalHistoriaFormGroup = new FormGroup({});
  items: FormArray;

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

  constructor(private firestoreService: FirestoreService, private modalService: NgbModal, private formBuilder: FormBuilder, private zone: NgZone) { }

  ngOnInit(): void {
    this.firestoreService.getAllUsers().valueChanges().subscribe(response => {
      this.users = response;
    });
    this.modalHistoriaFormGroup = this.formBuilder.group({
      altura: this.altura,
      peso: this.peso,
      temperatura: this.temperatura,
      presion: this.presion,
      items: this.formBuilder.array([this.createItem()])
    });
    this.user = JSON.parse(localStorage.getItem('user'));
    this.tipo = this.user.tipo;
    if (this.tipo === 'paciente') {
      let query = this.firestoreService.getTurnosDePeciente(this.user.uid);
      query.onSnapshot((querySnapshot) => {
        this.turnos.splice(0, this.turnos.length);
        querySnapshot.forEach((doc) => {
          this.turnos.push(doc.data());
        });
        this.zone.run(() => {
          this.turnosAListar = [...this.turnos];
        });
      });
    }

    if (this.tipo === 'especialista') {

      let query = this.firestoreService.getTurnosDeEspecialista(this.user.uid);
      query.onSnapshot((querySnapshot) => {
        this.turnos.splice(0, this.turnos.length);
        querySnapshot.forEach((doc) => {
          this.turnos.push(doc.data());
        });
        this.zone.run(() => {
          this.turnosAListar = [...this.turnos];
        });
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
    this.modalService.open(this.modalHistoria);
  }

  guardarModal() {
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

  mostrarEncuesta(turno) {
    this.turno = turno;
    this.modalService.open(this.modal3);
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
    this.turno = turno;
    this.modalService.open(this.modalEncuesta);
  }

  addResena(turno) {
    this.turno = turno;
    this.modalService.open(this.modal);
  }

  guardarModalHistoria(turno) {
    this.turno = turno;
    this.turno.estado = 'Finalizado';
    let paciente;
    this.users.forEach(user => {
      if (user['uid'] === this.turno.paciente.uid) {
        paciente = user;
      }
    });
    let especialista = this.user;
    let existeParaEspecialista = false;
    paciente.historiaClinica.forEach(historia => {
      if (historia.especialista.uid === this.user.uid) {
        existeParaEspecialista = true;
        let formData = this.modalHistoriaFormGroup.value;
        paciente.historia
        historia.altura = formData.altura;
        historia.peso = historia.peso;
        historia.presion = historia.presion;
        historia.temperatura = historia.temperatura;
        if (historia.items) {
          formData.items.forEach(item => {
            historia.items.push(item);
          });
        } else {
          historia.items = [...formData.items]
        }
        this.turno.paciente = paciente;
      }
    });

    if (!existeParaEspecialista) {
      paciente.historiaClinica.push({ ...this.modalHistoriaFormGroup.value, especialista });
    }

    this.firestoreService.actualizarTurno(this.turno.uid, this.turno);
    this.firestoreService.actualizarUsuarios(paciente.uid, paciente);
    this.modalService.dismissAll();
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      titulo: new FormControl(''),
      descripcion: new FormControl(''),
    });
  }

  addItem(): void {
    this.items = this.modalHistoriaFormGroup.get('items') as FormArray;
    this.items.push(this.createItem());
  }

  guardarModalEncuesta() {
    this.turno.encuesta = this.modalEncuestaFormGroup.value;
    this.firestoreService.actualizarTurno(this.turno.uid, this.turno);
    this.firestoreService.guardarEncuesta(this.turno.encuesta);
    this.modalService.dismissAll();
  }
}
