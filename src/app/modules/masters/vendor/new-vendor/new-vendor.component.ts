import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-vendor',
  templateUrl: './new-vendor.component.html',
  styleUrls: ['./new-vendor.component.css']
})
export class NewVendorComponent implements OnInit {
  VendorName:any;
  constructor(private router:Router) { }

  ngOnInit() {
  }
  addVendorDetails(){
    this.router.navigate(['/masters/vendor/addvendordetails'],{state: {data:this.VendorName}})
  }
}
