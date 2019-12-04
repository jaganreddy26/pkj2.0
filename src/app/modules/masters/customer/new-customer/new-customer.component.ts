import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {
  CustomerName:any;
  constructor(private router:Router) { }

  ngOnInit() {
  }
  addCustomerDetails(){
    this.router.navigate(['/masters/customer/addcustomerdetails'],{state: {data:this.CustomerName}})
  }
}
