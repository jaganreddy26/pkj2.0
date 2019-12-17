import { Component, OnInit } from '@angular/core';
import { ModuleService } from '../../../module.service';
import { ResizeEvent } from 'angular-resizable-element';
import { Customer } from '../../../../shared/entities/customer';
import { AppService } from '../../../../shared/service/app.service';
import { Bank } from '../../../../shared/entities/bank';
import { DocumentFiles } from '../../../../shared/entities/document';
@Component({
  selector: 'app-view-customer-details',
  templateUrl: './view-customer-details.component.html',
  styleUrls: ['./view-customer-details.component.css']
})
export class ViewCustomerDetailsComponent implements OnInit {
  height: any = 43;
  previousHeight: number = 43;
  innerHeight: number;
  width: number = 70;
  maxHeight: number;
  restoreHeight: number;
  selectedTab: any = 0;

  isNodelLabelChange: boolean = false;
  customer: Customer = new Customer();
  isEdit: boolean = false;
  dataSrc: any = [];
  childrenNode: any;
  customerId: any;
  agencys: any = [];
  bankAccDetails: any = [];
  bankBranches: any = [];
  panDocumentPath: any
  tanDocumentPath: any;
  cinDocumentPath: any;
  gstinDocumentPath: any;
  bankObj: Bank = new Bank();
  document: DocumentFiles = new DocumentFiles();
  constructor(private service: ModuleService, private appService: AppService) { }

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
    this.getTreeData();
  }
  refresh() {
    this.getTreeData();
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

  checkPermission() {

    let url = 'ManageTransactionLockApi/SetContextLock';
    let obj = {
      "Type": 'Master',
      "LockContextType": 'Customer',
      "LockContextValue": this.customerId,
      "UserID": 'A01_Administrator'
    }

    this.service.postData(obj, url).subscribe((data: any) => {
      this.isEdit = data.Status;
      this.getBankBranchs();
    })

  }
  viewDetails() {
    this.releaseLock();
  }

  releaseLock() {
    let url = 'ManageTransactionLockApi/ReleaseContextLock';
    let obj = {
      "Type": 'Master',
      "LockContextType": 'Customer',
      "LockContextValue": this.customerId,
      "UserID": 'A01_Administrator'
    }

    this.service.postData(obj, url).subscribe((data: any) => {

      if (data = "Released") {
        this.isEdit = false;
        console.log('hi12');
      }
      else {

        console.log('hi123');
      }
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


  nodeLabel(node) {
    this.isEdit = false;
    console.log(node);
    if (node) {
      localStorage.setItem('nodeLabel', node);
      this.childrenNode = node;
      this.isNodelLabelChange = true;
    }
    this.customerId = this.childrenNode.Id
    this.customerDetailsById();

  }
  customerDetailsById() {
    let obj = { CustomerId: this.childrenNode.Id }
    let url = 'MasterDataApi/GetCustomerMaster_SF'
    this.service.postData(obj, url).subscribe((data: any) => {
      console.log(data);
      if (data.length != 0) {
        this.customer = data[0];
        this.customerId = data[0].CustomerId;
        console.log(this.customer);
        this.viewDetails();
        this.getAgencyMapping();
        this.getDocuments('PAN');
        this.getDocuments('TAN');
        this.getDocuments('GSTIN');
        this.getDocuments('CIN');
        console.log(this.childrenNode.Id);
        this.getBanks();
        this.agencys = [];

      }

    })
  }
  checkPermissionAgencyEvent($event) {
    this.getAgencyMapping();
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
      "BusinessId": this.appService.businessId,
      "Entity": "Customer",
      "EntityId": this.customerId,
      "Status": status
    }
    console.log(agencyInputobj);
    let agencyUrl = 'MasterDataApi/GetMappedAgencyByEntityStatus_SF';
    this.service.postData(agencyInputobj, agencyUrl).subscribe((data: any) => {
      console.log(data);
      this.agencys = data;
    })
  }
  getBanks() {
    let url = "MasterDataApi/GetAllMappedBankAccountsByEntityId_SF"
    let data = { "BusinessId": '', "Entity": 'Customer', "EntityId": this.customerId, "Status": 2 }
    this.service.postData(data, url).subscribe((data: any) => {
      this.bankAccDetails = data;
      console.log(data)
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
          "EntityName": this.customerId + '_' + this.customer.CustomerName,
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
  saveAgencyDetails($event) {
    console.log($event);
    this.agencys = $event;
    let agencyArray: any = []
    this.agencys.forEach(element => {
      if (element.Status == true) {
        element.Status = 1
      } else {
        element.Status = 0
      }
      agencyArray.push({ 'EntityId': this.customerId, 'AgencyId': element.AgencyId, 'Status': element.Status })

    });
    let data = {
      "BusinessId": this.appService.businessId,
      "EntityAgency": agencyArray

    }
    let url = 'MasterDataApi/UpsertCustomerAgencyMapping';
    this.service.postData(data, url).subscribe((data: any) => {
      console.log();
      if (data) {

        this.appService.showMessage('Saved Successfully', 'X');
        this.getAgencyMapping();
        // this.vendorForm.isChanged = false;
      } else {
        this.appService.showMessage('Something went wrong', 'X');
      }
    })
  }
  saveBankDetails($event) {
    //  console.log($event)
    this.bankObj = $event;
    this.bankObj.Entity = 'Customer';
    this.bankObj.EntityId = this.customerId;
    this.bankObj.BusinessId = '';
    let url = 'MasterDataApi/UpsertBankAccountByEntity ';
    let data = this.bankObj;
    console.log(data);
    this.service.postData(data, url).subscribe((data: any) => {
      if (data) {
        this.appService.showMessage('Saved Successfully', 'X');
        this.getBanks();
      } else {
        this.appService.showMessage('Something went wrong', 'X');
      }
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
    this.document.EntityName = this.customerId + '_' + this.customer.CustomerName;
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
  updateCustomerDetails() {
    let object = {
      "CustomerId": this.customer.CustomerId,
      "CustomerTypeId": this.customer.CustomerTypeId,
      "CustomerName": this.customer.CustomerName,
      "Email1": this.customer.Email1,
      "Email2": this.customer.Email2,
      "URL": this.customer.URL,
      "Phone1": this.customer.Phone1,
      "Phone2": this.customer.Phone2,
      "Address1": this.customer.Address1,
      "Address2": this.customer.Address2,
      "Address3": this.customer.Address3,
      "StateId": this.customer.StateId,
      "CIN": this.customer.CIN,
      "GSTIN": this.customer.GSTIN,
      "PAN": this.customer.PAN,
      "TAN_NO":this.customer.TAN_NO,
      "Status": 1,
      "PreviousStatus": 0,
      "Fax": this.customer.Fax

    }
    let url = "MasterDataApi/UpsertCustomerMaster";
    this.service.postData(object, url).subscribe((data: any) => {
      if (data) {
        this.appService.showMessage('Saved Successfully', 'X');
       
        // if (this.isCheckForm == true) {
        this.isEdit = false;
        this.releaseLock();
        this.customerDetailsById();
        //  }
      } else {
        this.appService.showMessage('Something went wrong', 'X')
      }
    })

  }
}
