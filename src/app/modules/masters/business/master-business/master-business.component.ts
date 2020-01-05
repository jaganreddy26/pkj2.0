import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-master-business',
  templateUrl: './master-business.component.html',
  styleUrls: ['./master-business.component.css']
})
export class MasterBusinessComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  addBusiness(){
    this.router.navigate(['/masters/business/addbusiness',{}])
  }
  viewBusinee(){
    this.router.navigate(['/masters/business/viewbusiness',{}])
  }
}
