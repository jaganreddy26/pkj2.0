import { Component ,EventEmitter} from '@angular/core';
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
  isToggle:any;
  executeAction: EventEmitter<any> = new EventEmitter();
  constructor(public router:Router){
    let myString = this.isOpen? "true":"false";
    localStorage.setItem('toggle',myString);
    this.isToggle = localStorage.getItem('toggle');
  }
  getUrl(url){
    localStorage.setItem('url',url)
  }
  toggle(){
    this.isOpen = !this.isOpen;
    let myString = this.isOpen? "true":"false";
    localStorage.setItem('toggle',myString)
    this.executeAction.emit();
  }
  getToggle(){
   return localStorage.getItem('toggle');
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

