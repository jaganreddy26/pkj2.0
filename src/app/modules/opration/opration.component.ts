import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-opration',
  templateUrl: './opration.component.html',
  styleUrls: ['./opration.component.css']
})
export class OprationComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  ubt(){
    this.router.navigate(['/ubt',{}])
  }
  company(){
    this.router.navigate(['/view-and-update-company',{}])
  }
}
