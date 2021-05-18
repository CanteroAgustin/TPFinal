import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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
  tipoControl = new FormControl('');
  nombreControl = new FormControl('', Validators.required);
  apellidoControl = new FormControl('', Validators.required);
  edadControl = new FormControl('', [Validators.required, Validators.min(1), Validators.max(99)]);
  dniControl = new FormControl('', [Validators.required, Validators.pattern('[0-9]{8}')]);
  obraSocialControl = new FormControl(undefined, [Validators.required, Validators.pattern('[a-zA-Z ]*')]);
  emailControl = new FormControl('', [Validators.required, Validators.pattern("([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}")]);
  passwordControl = new FormControl('', [Validators.required, this.passwordValidator()]);
  especialidadesControl = new FormControl(undefined, [Validators.required, Validators.pattern('[a-zA-Z ]*')]);
  perfil1Control = new FormControl(undefined, Validators.required);
  perfil2Control = new FormControl(undefined, Validators.required);

  registerForm = new FormGroup({
    nombreControl: this.nombreControl,
    apellidoControl: this.apellidoControl,
    edadControl: this.edadControl,
    dniControl: this.dniControl,
    obraSocialControl: this.obraSocialControl,
    emailControl: this.emailControl,
    passwordControl: this.passwordControl,
    tipoControl: this.tipoControl,
    especialidadesControl: this.especialidadesControl,
    perfil1Control: this.perfil1Control,
    perfil2Control: this.perfil2Control,
  });

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.tipoControl.patchValue('especialista');
    this.obraSocialControl.setValidators(null);
    this.perfil2Control.setValidators(null);
    this.registerForm.updateValueAndValidity();
    this.activeEsp = 'activeEsp';
    this.activePac = '';
    this.img1 = '';
    this.img2 = '';
  }


  setEspecialista() {
    this.tipoControl.patchValue('especialista');
    this.obraSocialControl.setValidators(null);
    this.perfil2Control.setValidators(null);
    this.especialidadesControl.setValidators([Validators.required, Validators.pattern('[a-zA-Z ]*')]);
    this.obraSocialControl.updateValueAndValidity();
    this.perfil2Control.updateValueAndValidity();
    this.activeEsp = 'activeEsp';
    this.activePac = '';
    this.img1 = '';
    this.img2 = '';
  }

  setPaciente() {
    this.tipoControl.patchValue('paciente');
    this.especialidadesControl.setValidators(null);
    this.obraSocialControl.setValidators([Validators.required, Validators.pattern('[a-zA-Z ]*')]);
    this.perfil2Control.setValidators(Validators.required);
    this.especialidadesControl.updateValueAndValidity();
    this.obraSocialControl.updateValueAndValidity();
    this.perfil2Control.reset;
    this.activeEsp = '';
    this.activePac = 'activePac';
    this.img1 = '1';
    this.img2 = '2';
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const alphaNumericRegex = new RegExp('[a-zA-Z\s0-9]+');
      const isAlphanumeric = alphaNumericRegex.test(control.value);
      const isValidLength = control.value.length > 6 && control.value.length < 9;
      if (control.value.length === 0) { return null };
      return (!isValidLength || !isAlphanumeric) ? { 'password': { value: control.value } } : null;
    };
  }
}