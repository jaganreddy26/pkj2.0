import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-master-service',
  templateUrl: './master-service.component.html',
  styleUrls: ['./master-service.component.css']
})
export class MasterServiceComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  addService(){
    this.router.navigate(['/masters/service/addservice',{}])
  }
  viewService(){
    this.router.navigate(['/masters/service/viewservice',{}])
  }
}
