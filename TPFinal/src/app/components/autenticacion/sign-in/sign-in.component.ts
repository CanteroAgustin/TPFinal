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

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    public authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['home']);
    }
  }

  setAdminMock() {
    this.loginForm.setValue({
      email: 'agustincantero11@gmail.com',
      password: '123456'
    })
  }
  setEspecialistaMock() {
    this.loginForm.setValue({
      email: 'agustin7_7@yahoo.com.ar',
      password: '1234567'
    })
  }
  setPacienteMock() {
    this.loginForm.setValue({
      email: 'cantero.agustin@yahoo.com.ar',
      password: '123456'
    })
  }

}