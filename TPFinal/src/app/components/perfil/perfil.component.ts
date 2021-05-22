import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/storage';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  user;
  perfil1;
  perfil2;
  storageRef;

  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.storageRef = firebase.storage().ref();

    if (this.user.perfil1) {
      const ref1 = this.storageRef.child(`user/perfil1/${this.user.uid}-${this.user.perfil1}`);
      ref1.getDownloadURL().then(url => {
        this.perfil1 = url;
      }).catch(function (error) {
        console.log(error);
      });
    }

    if (this.user.perfil2) {
      const ref2 = this.storageRef.child(`user/perfil2/${this.user.uid}-${this.user.perfil2}`);
      ref2.getDownloadURL().then(url => {
        this.perfil2 = url;
      }).catch(function (error) {
        console.log(error);
      });
    }
  }

}
