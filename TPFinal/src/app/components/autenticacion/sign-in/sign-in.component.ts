import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/firebase/auth.service';
import * as mockUser from '../../../usuarioMock';

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
      this.router.navigate(['busqueda']);
    }
  }

  loginMock(user, pass) { //TODO Reemplazar por login real
    if (user === mockUser.admin.email && pass === mockUser.admin.password && mockUser.admin.emailVerified){
      console.log("paso");
    }
  }

  mockUser() {
    this.loginForm.setValue({
      email: 'agustin7_7@yahoo.com.ar',
      password: 'testUser'
    })
  }

}