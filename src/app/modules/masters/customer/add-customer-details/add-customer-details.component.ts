import { Component, OnInit, Input, ViewChild, Output, EventEmitter, SimpleChanges, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ResizeEvent } from 'angular-resizable-element';
import { UBT } from '../../../ubt/ubt';
import { ModuleService } from '../../../module.service';
import { NgForm } from "@angular/forms";
import {Customer} from '../../../../shared/entities/customer';
@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer-details.component.html',
  styleUrls: ['./add-customer-details.component.css']
})
export class AddCustomerComponent implements OnInit {
  customer:Customer = new Customer();
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
  CustomerType:any=[];
  CustomerName:any;
  isEdit:boolean=false;
  @ViewChild(NgForm, { static: true }) myForm: NgForm;
  constructor(private router: Router, private service: ModuleService) {
    this.customer.CustomerName=history.state.data;
    this.getStates();
   this.getCustomerType();
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
  // refresh() {
  //   this.getTreeData();
  // }
  getStates() {
    let url = "MasterDataApi/GetAllStates_SF";
    this.service.getData({}, url).subscribe((data: any) => {
      console.log(data);
      this.states = data;
    })
  }
  getCustomerType(){
    let url = "MasterDataApi/GetCustomerType_SF";
    this.service.getData({}, url).subscribe((data: any) => {
      console.log(data);
      this.CustomerType = data;
    })
  }
  saveDocumentFiles($event) {
    console.log($event)
    //  this.document.BusinessId = this.bussinessId;
    //  this.document.BusinessName = this.bussinessName;
    //  this.document.ControlId = 'ControlId-1';
    //  this.document.Entity = 'Company';
    //  this.document.EntityCategory = 'Master';
    //  this.document.EntityParent = this.bussinessName + '/' + this.companyName
    //  this.document.EntityId = this.document.FileDetails.FilePath;
    //  this.document.FileDetails = $event;
    //  this.document.Type = $event.UploadedFileName;
    //  let url = 'MasterDataApi/SaveDocument';
    //  let data = this.document;
    //  this.service.postData(data, url).subscribe((data: any) => {
    //    if (data) {
    //      this.appService.showMessage('Saved Successfully','X');
    //      this.getDocuments(this.document.Type)
    //      this.closeDialog();
    //    }else{
    //      this.appService.showMessage('Somethimg went wrong','X');
    //    }
    //  })
 
   }
   saveCustomerDetails(){
     console.log(this.customer);

     let url = "Account/UpsertCustomerMaster";
     this.service.getData(this.customer, url).subscribe((data: any) => {
       console.log(data);
       //this.CustomerType = data;
     })
    this.isEdit=true;
   }
   changeStates($event){
     console.log($event);
     this.customer.StateId=35;
     this.customer.CustomerTypeId=1;
   }
}

