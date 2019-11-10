import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'example-poc';
  sidenavWidth = 14;
  ngStyle: string;
  isOpen=true;
  constructor(){

  }
  getUrl(url){
    localStorage.setItem('url',url)
  }
  // increase() {
  //   this.sidenavWidth = 15;
  //   console.log('increase sidenav width');
  // }
  // decrease() {
  //   this.sidenavWidth = 4;
  //   console.log('decrease sidenav width');
  // } 
  //(mouseenter)="increase()"(mouseleave)="decrease()"
}

