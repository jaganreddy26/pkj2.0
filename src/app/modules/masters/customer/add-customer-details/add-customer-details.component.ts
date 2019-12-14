import { Component, OnInit, Input, ViewChild, Output, EventEmitter, SimpleChanges, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ResizeEvent } from 'angular-resizable-element';
import { UBT } from '../../../ubt/ubt';
import { ModuleService } from '../../../module.service';
import { NgForm } from "@angular/forms";
import { Customer } from '../../../../shared/entities/customer';
import { AppService } from '../../../../shared/service/app.service';
import { DocumentFiles } from '../../../../shared/entities/document';
import { Bank } from '../../../../shared/entities/bank';
@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer-details.component.html',
  styleUrls: ['./add-customer-details.component.css']
})
export class AddCustomerComponent implements OnInit {

  customer: Customer = new Customer();
  document: DocumentFiles = new DocumentFiles();
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
  states: any = [];
  CustomerType: any = [];
  CustomerName: any;

  customerDetailsById: any = {}
  isEdit: boolean = false;
  panDocumentPath: any
  tanDocumentPath: any;
  cinDocumentPath: any;
  gstinDocumentPath: any;
  agencys: any = [];
  bankAccDetails: any = [];
  bankBranches:any=[];
  bankObj: Bank = new Bank();
  @ViewChild(NgForm, { static: true }) myForm: NgForm;
  constructor(private router: Router, private service: ModuleService, private appService: AppService) {
    this.customer.CustomerName = history.state.data;
    this.getStates();
    this.getCustomerType();
    this.getBankBranchs();
    //this.getTreeData();
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
  // nodeLabel(node) {
  //   console.log(node);
  //   if (node) {
  //     localStorage.setItem('nodeLabel', node);
  //     this.childrenNode = node;
  //   }
  //   let obj = { CustomerId: this.childrenNode.Id }
  //   let url = 'MasterDataApi/GetCustomerMaster_SF'
  //   this.service.postData(obj, url).subscribe((data: any) => {
  //     console.log(data);
  //     if (data.length != 0) {
  //       this.customer = data[0];
  //       this.customerDetailsById=data[0];
  //       console.log(this.customer);
  //     }

  //   })
  //   this.getAgencyMapping();
  //   this.getDocuments('PAN');
  //   this.getDocuments('TAN');
  //   this.getDocuments('GSTIN');
  //   this.getDocuments('CIN');
  //   console.log(this.childrenNode.Id);
  //   this.getBanks()
  // }
 
  getStates() {
    let url = "MasterDataApi/GetAllStates_SF";
    this.service.getData({}, url).subscribe((data: any) => {
      console.log(data);
      this.states = data;
    })
  }
  getCustomerType() {
    let url = "MasterDataApi/GetCustomerType_SF";
    this.service.getData({}, url).subscribe((data: any) => {
      console.log(data);
      this.CustomerType = data;
    })
  }
  saveDocumentFiles($event) {

    console.log(this.customer);
    console.log($event)
    this.document.EntityCategory = 'Master';
    this.document.BusinessId = '';
    this.document.BusinessName = '';
    this.document.CompanyId = '';
    this.document.CompanyName = '';
    this.document.BusinesTypes = '';
    this.document.EntityParent = '';
    this.document.EntityType = 'Customer';
    this.document.EntityName = this.customerDetailsById.CustomerId + '_' + this.customerDetailsById.CustomerName;
    this.document.DocumentType = $event.UploadedFileName;
    this.document.ControlId = 'ControlId-1';
    this.document.FileDetails = $event;
    let url = 'MasterDataApi/SaveDocument';
    let data = this.document;
    console.log(data);
    this.service.postData(data, url).subscribe((data: any) => {
      console.log(data);
      if (data) {
        this.appService.showMessage('Saved Successfully', 'X');
        this.getDocuments(this.document.DocumentType);
        //this.closeDialog();
      } else {
        this.appService.showMessage('Somethimg went wrong', 'X');
      }
    })

  }
  //adding new CustomerDetails
  saveCustomerDetails() {
    console.log(this.customer);

    let url = "MasterDataApi/UpsertCustomerMaster";
    this.service.postData(this.customer, url).subscribe((data: any) => {
      console.log(data);
      if (data != null) {
        this.appService.showMessage('Saved Successfully', 'X');

        //getCustoremerDetailsById
        let obj = { CustomerId: data }
        let url = 'MasterDataApi/GetCustomerMaster_SF';
        this.service.postData(obj, url).subscribe((data: any) => {
          console.log(data);
          if (data.length != 0) {
            this.customer = data[0];
            console.log(this.customer);
            this.customerDetailsById = this.customer;
          }

        })
        this.isEdit = true;
        //getAgencyDetailsByCustoreId
        this.getAgencyMapping()

      } else {
        this.appService.showMessage('Somethimg went wrong', 'X');
      }
    })

  }
  changeStates($event) {
    console.log($event.value);
    this.customer.StateId = 35;

  }
  changeCustomerType($event) {
    this.customer.CustomerTypeId = $event.value;
  }
  getTreeData() {
    let obj = {
      "SchemaName": "dbo",
      "EntityCategory": "Master",
      "Entity": "CUSTOMER",
      "ReturnType": "TREE"



    }
    let url = 'Tree/GetTree_SF'
    this.service.postData(obj, url).subscribe((data: any) => {
      this.dataSrc = data.RecursiveObjects;
    })
  }
  getDocuments(type) {
    let data = {
      "DocumentInfo": [
        {
          "EntityCategory": 'Master',
          "BusinessId": '',
          "BusinessName": '',
          "CompanyId": '',
          "CompanyName": '',
          "BusinesTypes": '',
          "EntityParent": '',
          "EntityType": 'Customer',
          "EntityName": this.customerDetailsById.CustomerId + '_' + this.customerDetailsById.CustomerName,
          "DocumentType": type,
          "ControlId": "ControlId-1",
          "FilesCount": 1

        },
      ]
    }
    let url = "FilesApi/GetAllFilesforScreen_SF"
    this.service.postData(data, url).subscribe((data: any) => {
      console.log(data);
      if (type == "PAN") {
        if (data && data.AbsolutePath[0].DocumentsAbsolutePath.length != 0) {
          this.panDocumentPath = data.AbsolutePath[0].DocumentsAbsolutePath[0].AbsoluteFilePath;
        } else {
          this.panDocumentPath = null;
        }

      } else if (type == "GSTIN") {
        if (data && data.AbsolutePath[0].DocumentsAbsolutePath.length != 0) {
          this.gstinDocumentPath = data.AbsolutePath[0].DocumentsAbsolutePath[0].AbsoluteFilePath;
        } else {
          this.gstinDocumentPath = null;
        }


      } else if (type == "TAN") {
        if (data && data.AbsolutePath[0].DocumentsAbsolutePath.length != 0) {
          this.tanDocumentPath = data.AbsolutePath[0].DocumentsAbsolutePath[0].AbsoluteFilePath;
        } else {
          this.tanDocumentPath = null;
        }

      } else if (type == "CIN") {
        if (data && data.AbsolutePath[0].DocumentsAbsolutePath.length != 0) {
          this.cinDocumentPath = data.AbsolutePath[0].DocumentsAbsolutePath[0].AbsoluteFilePath;
        } else {
          this.cinDocumentPath = null;
        }

      } else {
        this.panDocumentPath = null;
        this.gstinDocumentPath = null;
        this.tanDocumentPath = null;
        this.cinDocumentPath = null;
      }
    })
  }
  getAgencyMapping() {
    let status = 1;
    if (this.isEdit == true) {
      status = 2;
    } else {
      status = 1;
    }

    let agencyInputobj =
    {
      "BusinessId": "",
      "Entity": "Customer",
      "EntityId": this.customerDetailsById.CustomerId,
      "Status": status
    }
    let agencyUrl = 'MasterDataApi/GetMappedAgencyByEntityStatus_SF';
    this.service.postData(agencyInputobj, agencyUrl).subscribe((data: any) => {
      console.log(data);
      this.agencys = data;
    })
  }
  checkPermissionAgencyEvent($event){
    this.getAgencyMapping();
  }
  saveAgencyDetails($event){
    console.log($event);
    this.agencys = $event;
    let agencyArray: any = []
    this.agencys.forEach(element => {
      if (element.Status == true) {
        element.Status = 1
      } else {
        element.Status = 0
      }
      agencyArray.push({ 'CustomerId':this.customerDetailsById.CustomerId, 'AgencyId': element.AgencyId, 'Status': element.Status })

    });
    let data = {
      "BusinessId": 'A',
      "EntityAgency": agencyArray

    }
    let url = 'MasterDataApi/UpsertCustomerAgencyMapping';
    this.service.postData(data, url).subscribe((data: any) => {
      console.log();
      if (data) {
        this.appService.showMessage('Saved Successfully','X');
        this.getAgencyMapping();
       // this.vendorForm.isChanged = false;
      }else{
        this.appService.showMessage('Something went wrong','X');
      }
    })
  }
  getBanks() {
    let url = "MasterDataApi/GetAllMappedBankAccountsByEntityId_SF"
    let data = { "BusinessId": '', "Entity": 'Customer', "EntityId": this.customerDetailsById.CustomerId, "Status": 2 }
    this.service.postData(data, url).subscribe((data: any) => {
      this.bankAccDetails = data;
      //   console.log(data)
    })
  }
  getBankBranchs() {
    console.log("hi1");
    let url = "MasterDataApi/GetAllBankAndBranch_SF"
    let data = { "Status": 1 }
    this.service.postData(data, url).subscribe((data: any) => {
      this.bankBranches = data;
      //   console.log(data)
    })
  }
  saveBankDetails($event) {
    //  console.log($event)
    this.bankObj = $event;
    this.bankObj.Entity = 'Customer';
    this.bankObj.EntityId = this.customerDetailsById.CustomerId;
    this.bankObj.BusinessId = '';
    let url = 'MasterDataApi/UpsertBankAccountByEntity ';
    let data = this.bankObj;
    console.log(data);
    this.service.postData(data, url).subscribe((data: any) => {
      if (data) {
        this.appService.showMessage('Saved Successfully','X');
        this.getBanks();
      }else{
        this.appService.showMessage('Something went wrong','X');
      }
    })
  }
}

