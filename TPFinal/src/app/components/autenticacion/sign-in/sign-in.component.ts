import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/firebase/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements OnInit {

  msgError = '';
  isLoading = false;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    selectMock: new FormControl('')
  });

  constructor(
    public authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.authService.errorMsg.subscribe(msg => {
      this.msgError = msg;
    });
    this.loginForm.setValue({
      email: '',
      password: '',
      selectMock: 'Seleccione un usuario de test'
    });
    if (localStorage.getItem('user')) {
      this.router.navigate(['home']);
    }
  }

  setMock() {
    let opcion = this.loginForm.get('selectMock').value;
    let emailMock = '';
    let passMock = '';
    switch (opcion) {
      case 'admin1':
        emailMock = 'agustincantero11@gmail.com';
        passMock = '123456';
        break;
      case 'admin2':
        emailMock = 'admin@test.com';
        passMock = '123456';
        break;
      case 'especialista1':
        emailMock = 'agustin7_7@yahoo.com.ar';
        passMock = '123456';
        break;
      case 'especialista2':
        emailMock = 'agustincantero271@gmail.com';
        passMock = '123456';
        break;
      case 'paciente1':
        emailMock = 'cantero.agustin@yahoo.com.ar';
        passMock = '123456';
        break;
      case 'paciente2':
        emailMock = 'paciente@test.com';
        passMock = '123456';
        break;
    }
    this.loginForm.patchValue({
      email: emailMock,
      password: passMock
    })
  }

  closeAlert() {
    this.msgError = '';
  }

  login(user, pass) {
    this.isLoading = true;
    this.authService.SignIn(user, pass).then(() => {
      this.isLoading = false;
    }).catch(error => {
      this.isLoading = false;
      console.log(error);
    });
  }
}