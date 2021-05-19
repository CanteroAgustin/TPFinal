import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userCompleto;
  constructor() { }

  ngOnInit(): void {
    this.userCompleto = JSON.parse(localStorage.getItem('user'));
    console.log('');
  }

}
