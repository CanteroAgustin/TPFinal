import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/firebase/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {

  img1 = '';
  img2 = '';
  activeEsp = '';
  activePac = '';
  tipo = new FormControl('');

  registerForm = new FormGroup({
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    edad: new FormControl(''),
    dni: new FormControl(''),
    obraSocial: new FormControl(undefined),
    email: new FormControl(''),
    password: new FormControl(''),
    tipo: this.tipo,
    especialidades: new FormControl(''),
    perfil1: new FormControl(undefined),
    perfil2: new FormControl(undefined),
  });

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.tipo.patchValue('especialista');
    this.activeEsp = 'activeEsp';
    this.activePac = '';
    this.img1 = '';
    this.img2 = '';
  }


  setEspecialista() {
    this.tipo.patchValue('especialista');
    this.activeEsp = 'activeEsp';
    this.activePac = '';
    this.img1 = '';
    this.img2 = '';
  }

  setPaciente() {
    this.tipo.patchValue('paciente');
    this.activeEsp = '';
    this.activePac = 'activePac';
    this.img1 = '1';
    this.img2 = '2';
  }

}