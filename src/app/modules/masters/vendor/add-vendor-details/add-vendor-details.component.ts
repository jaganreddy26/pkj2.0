import { Component, OnInit } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';
import { Vendor } from '../../../../shared/entities/vendor'
@Component({
  selector: 'app-add-vendor-details',
  templateUrl: './add-vendor-details.component.html',
  styleUrls: ['./add-vendor-details.component.css']
})
export class AddVendorDetailsComponent implements OnInit {

  height: any = 43;
  previousHeight: number = 43;
  innerHeight: number;
  width: number = 70;
  maxHeight: number;
  restoreHeight: number;
  selectedTab: any = 0;

  vendorname: any;
  vendor: Vendor = new Vendor();
  isEdit: boolean = true;
  constructor() { }

  ngOnInit() {
    this.vendorname = history.state.data;
    this.maxHeight = window.innerHeight - 56;
    if (localStorage.getItem('ubt')) {
      //this.ubt = JSON.parse(localStorage.getItem('ubt'))
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

  onResizeEnd(event: ResizeEvent) {
    if (event) {
      //  console.log(event.rectangle.height);
      if (event.rectangle.height >= 43 && event.rectangle.height <= window.innerHeight - 56) {
        this.height = event.rectangle.height;
        this.previousHeight = this.height;
      }
    }
  }
  minWidth() {
    this.width = 40;

  }
  maxWidth() {
    this.width = 70;
  }
  min() {
    this.height = 43;
  }
  max() {
    if (this.height != window.innerHeight - 56) {
      this.height = window.innerHeight - 56;
    } else {
      this.height = this.previousHeight;
    }
  }
}


