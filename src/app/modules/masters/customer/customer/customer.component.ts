import { Component, OnInit } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';
import { Router } from '@angular/router';
import { UBT } from '../../../ubt/ubt';
import { ModuleService } from '../../../module.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerAddComponent implements OnInit {
  height: any = 43;
  previousHeight: number = 43;
  innerHeight: number;
  width: number = 70;
  maxHeight: number;
  restoreHeight: number;
    ubt: UBT = new UBT();
  selectedTab: any = 0;
  array: any = [];
  dataSrc: any = [];
  childrenNode: any;
  firstName: any;
  states:any=[];
  constructor(private router: Router, private service: ModuleService) {
    this.getStates();
    this.getTreeData();
    //this.minWidth();
  }

  ngOnInit() {
    this.maxHeight = window.innerHeight - 56;
    if (localStorage.getItem('ubt')) {
      this.ubt = JSON.parse(localStorage.getItem('ubt'))
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
  back() {
    this.router.navigate(['/operation', {}])
  }
  getTreeData(){
    let obj = { "BusinessStatus": 2, "CompanyStatus": 2 }
    let url = 'MasterDataApi/GetMasterDataTree_SF'
    this.service.getData(obj, url).subscribe((data: any) => {
      let array = [];
      let children = []
      data[0].BusinessType.forEach(element => {
        element.Children.forEach(child => {
          children.push({ id: child.Id, name: child.Name })
        });
        array.push({ "id": element.Id, "name": element.Name, "children": children })
      });
      this.dataSrc = array;
    })
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
  previous() {
    this.height = this.previousHeight;
  }
  restore() {
    this.height = (window.innerHeight) / 2.2;
    this.restoreHeight = (window.innerHeight) / 2.2;
  }
  tabChange(event) {
 //   console.log(event)
    this.selectedTab = event.index;
  }
  ngOnDestroy(): void {
    localStorage.setItem('ubt', JSON.stringify(this.ubt));
    if (this.selectedTab != 0) {
      localStorage.setItem('ubtTab', this.selectedTab);
    }
    localStorage.setItem('ubtHeight', this.height)

  }
  dataNode(node) {

  }
  nodeLabel(node) {
    if (node) {
      localStorage.setItem('nodeLabel', node);
      this.childrenNode = node;
    }
    let obj = { CompanyId: this.childrenNode }
    let url = 'MasterDataApi/GetCompanyMaster'
    this.service.postData(obj, url).subscribe((data: any) => {
      if (data.length != 0) {
        this.ubt = data[0]
      }

    })
  }
  refresh() {
    this.getTreeData();
  }
  getStates() {
    let url = "MasterDataApi/GetAllStates_SF";
    this.service.getData({}, url).subscribe((data: any) => {
      this.states = data;
    })
  }
  addCustomer(){
    
     this.router.navigate(['/masters/customer/addcustomer',{}])
    
  }
  viewCustomer(){
    
    this.router.navigate(['/masters/customer/viewcustomer',{}])
   
 }

}

