import { Component, OnInit } from '@angular/core';
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

  constructor(public authService: AuthService) { }


  ngOnInit(): void {
    this.userCompleto = JSON.parse(localStorage.getItem('user'));
    this.storageRef = firebase.storage().ref();
    const ref = this.storageRef.child(`user/perfil1/${this.userCompleto.uid}-${this.userCompleto.perfil1}`);
    ref.getDownloadURL().then(url => {
      this.perfil1 = url;
    }).catch(function (error) {
      console.log(error);
    });
  }
}
