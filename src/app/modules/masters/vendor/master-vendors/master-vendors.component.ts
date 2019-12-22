import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModuleService } from '../../../module.service';
@Component({
  selector: 'app-master-vendors',
  templateUrl: './master-vendors.component.html',
  styleUrls: ['./master-vendors.component.css']
})
export class MasterVendorsComponent implements OnInit {
  height: any = 43;
  // previousHeight: number = 43;
  // innerHeight: number;
  // width: number = 70;
  maxHeight: number;
  selectedTab: any = 0;
  constructor(private router: Router, private service: ModuleService) { }

  ngOnInit() {
   
  }
  addVendor(){
    console.log('hi');
    // this.router.navigate(['/masters/addVendor',{}])
    this.router.navigate(['/masters/vendor/addcustomer',{}])
  }
  
  viewVendor(){
    this.router.navigate(['/masters/vendor/viewvendors',{}])
  }
}
