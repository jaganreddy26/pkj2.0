import { Component } from '@angular/core';
import { Router} from '@angular/router'

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
  isOperation:boolean=true;
  isAdminstration:boolean = false;
  constructor(public router:Router){

  }
  getUrl(url){
    localStorage.setItem('url',url)
  }
  addClass(route){
    if(route == 'operation'){
      this.isOperation = true;
      this.isAdminstration = false;
    }else{
      this.isOperation = false;
      this.isAdminstration = true;
    }
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

