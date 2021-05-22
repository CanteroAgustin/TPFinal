import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/storage';
import { AuthService } from 'src/app/services/firebase/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  perfil1 = '';
  userCompleto;
  storageRef;

  constructor(public authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.userCompleto = JSON.parse(localStorage.getItem('user'));
    this.storageRef = firebase.storage().ref();
    const ref = this.storageRef.child(`user/perfil1/${this.userCompleto.uid}-${this.userCompleto.perfil1}`);
    ref.getDownloadURL().then(url => {
      this.perfil1 = url;
    }).catch(function (error) {
      console.log(error);
    });
    if (this.userCompleto.tipo === 'admin' && this.router.url === '/home') {
      this.router.navigate(['usuarios'], { relativeTo: this.activatedRoute })
    }
  }
}
