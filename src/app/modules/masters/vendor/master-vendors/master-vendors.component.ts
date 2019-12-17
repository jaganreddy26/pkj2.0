import { Component, OnInit } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';
import { Router } from '@angular/router';
import { UBT } from '../../../ubt/ubt';
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
    this.maxHeight = window.innerHeight - 56;
    if (localStorage.getItem('ubt')) {
      // this.ubt = JSON.parse(localStorage.getItem('ubt'))
    }
    if (localStorage.getItem('ubtTab')) {
      this.selectedTab = localStorage.getItem('ubtTab');
    }
    if (localStorage.getItem('ubtHeight')) {
      this.height = localStorage.getItem('ubtHeight');
    } else {
      this.height = (window.innerHeight) / 2.2;
    }
  }
  addVendor(){
    console.log('hi');
    // this.router.navigate(['/masters/addVendor',{}])
    this.router.navigate(['/masters/vendor/addcustomer',{}])
  }
}
