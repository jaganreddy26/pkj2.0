import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  customerMaster(){
    this.router.navigate(['/masters/Customer',{}])
   // this.router.navigate(['/masters/createCustomer',{}])
    //this.router.navigate(['/ubt',{}])
  }
}
