import { Component, OnInit, ViewChild, HostListener, OnDestroy, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ResizeEvent } from 'angular-resizable-element';
import { ModuleService } from '../../module.service';
import { Company } from '../../../shared/entities/company';
import { DocumentFiles } from '../../../shared/entities/document';
import { Bank } from '../../../shared/entities/bank';
import { CompanyFormComponent } from '../company-form/company-form.component';
import { CustomerComponent } from '../customer/customer.component';
import { VendorComponent } from '../vendor/vendor.component';
import { DocumentsComponent } from '../documents/documents.component';
import { BankComponent } from '../bank/bank.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-view-and-update-company',
  templateUrl: './view-and-update-company.component.html',
  styleUrls: ['./view-and-update-company.component.css']
})
export class ViewAndUpdateCompanyComponent implements OnInit {
  @ViewChild(CompanyFormComponent, { static: false }) companyForm: CompanyFormComponent;
  @ViewChild(CustomerComponent, { static: false }) customerForm: CustomerComponent;
  @ViewChild(VendorComponent, { static: false }) vendorForm: VendorComponent;
  @ViewChild(DocumentsComponent, { static: false }) documentsForm: DocumentsComponent;
  @ViewChild(BankComponent, { static: false }) bankForm: BankComponent;
  document: DocumentFiles = new DocumentFiles();
  height: any = 43;
  previousHeight: number = 43;
  innerHeight: number;
  width: number = 25;
  maxHeight: number;
  restoreHeight: number;
  company: Company = new Company();
  selectedTab: any = 0;
  array: any = [];
  dataSrc: any = [];
  childrenNode: any;
  firstName: any;
  states: any = [];
  treeArray: any = [];
  customers: any = [];
  vendors: any = [];
  bankAccDetails: any = [];
  bankBranches: any = [];
  panDocumentPath: any;
  tanDocumentPath: any;
  cinDocumentPath: any;
  gstinDocumentPath: any;
  companyId: any;
  companyName: any;
  bussinessId: any;
  bussinessName: any;
  bankObj: Bank = new Bank();
  isEdit: boolean = false;
  isCheckForm: boolean = false;
  isNodelLabelChange: boolean = false;
  companyNode: any;
  constructor(private router: Router, private service: ModuleService, private dialog: MatDialog) {
    this.getStates();
    this.getLocalStorage();

  }
  @HostListener('window:beforeunload', ['$event'])
  public beforeunloadHandler($event) {
    $event.returnValue = "Are you sure?";
    this.releaseLock();
  }
  @ViewChild('statusDialog', { static: true }) statusDialog: TemplateRef<any>;
  ngOnInit() {
    this.maxHeight = window.innerHeight - 56;

    this.getTreeData();
    this.getBankBranchs();
    this.getAllData();
    //  this.saveCustomerDetails(null);
    //this.saveVendorDetails('')
  }
  getLocalStorage() {
    if (localStorage.getItem('companyId')) {
      this.childrenNode = localStorage.getItem('companyId');
      this.companyId = localStorage.getItem('companyId');
      this.getCompanyDetails(this.childrenNode)
    }
    if (localStorage.getItem('companyName')) {
      this.companyName = localStorage.getItem('companyName');
    }
    if (localStorage.getItem('bussinessId')) {
      this.bussinessId = localStorage.getItem('bussinessId');
    }
    if (localStorage.getItem('bussinessName')) {
      this.bussinessName = localStorage.getItem('bussinessName');
      //   console.log(this.bussinessName)
    }
    if (localStorage.getItem('ubtTree')) {
      this.treeArray = JSON.parse(localStorage.getItem('ubtTree'));
    }
    if (localStorage.getItem('company')) {
      this.company = JSON.parse(localStorage.getItem('company'))
    }
    // if (localStorage.getItem('companyTab')) {
    //   this.selectedTab = localStorage.getItem('companyTab');
    // }
    if (localStorage.getItem('companyHeight')) {
      this.height = localStorage.getItem('companyHeight');
    } else {
      this.height = 43;
      this.height = (window.innerHeight) / 2.2;
    }

  }
  getAllData() {

    this.getDocuments('PAN');
    this.getDocuments('TAN');
    this.getDocuments('GSTIN');
    this.getDocuments('CIN');
    this.getCustomers();
    this.getVendors();
    this.getBanks();
  }
  back() {
    this.router.navigate(['/operation', {}])
  }
  getTreeData() {
    let obj = {
      "SchemaName": 'dbo',
      "EntityCategory": 'Master',
      "Entity": 'COMPANY',
      "ReturnType": 'TREE'
    }
    let url = 'Tree/GetTree_SF'
    this.service.postData(obj, url).subscribe((data: any) => {
      this.dataSrc = data.RecursiveObjects;
    })
  }
  onResizeEnd(event: ResizeEvent) {
    if (event) {
      // console.log(event.rectangle.height);
      if (event.rectangle.height >= 43 && event.rectangle.height <= window.innerHeight - 56) {
        this.height = event.rectangle.height;
        this.previousHeight = this.height;
      }
    }
  }
  minWidth() {
    this.width = 0;

  }
  maxWidth() {
    this.width = 25;
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
    // console.log(event)
    this.selectedTab = event.index;
  }
  checkPermission() {

    let url = 'ManageTransactionLockApi/SetContextLock';
    let obj = {
      "Type": 'Master',
      "LockContextType": 'Company',
      "LockContextValue": this.companyId,
      "UserID": 'A01_Administrator'
    }

    this.service.postData(obj, url).subscribe((data: any) => {
      this.isEdit = data.Status;
    })
  }
  ngOnDestroy(): void {

    localStorage.setItem('company', JSON.stringify(this.company));
    if (this.selectedTab != 0) {
    //  localStorage.setItem('companyTab', this.selectedTab);
    }
    localStorage.setItem('companyHeight', this.height)
    
    if (this.companyForm.myForm.touched || this.documentsForm.files.length != 0 || this.vendorForm.isChanged || this.customerForm.isChanged) {
      this.openDialog();
      this.releaseLock();
    }
  
  }
  dataNode(node) {
    //  console.log(node)


  }
  nodeLabel(node) {
    this.companyNode = node;
    this.isNodelLabelChange = true;
    console.log(this.documentsForm.files)
    if (this.companyForm.myForm.touched || this.documentsForm.files.length != 0 || this.vendorForm.isChanged || this.customerForm.isChanged) {
      this.openDialog();
    } else {
      this.changeNode()

    }

  }
  getCompanyDetails(node) {
    let obj = { CompanyId: node }
    let url = 'MasterDataApi/GetCompanyMaster'
    this.service.postData(obj, url).subscribe((data: any) => {
      if (data.length != 0) {
        this.company = data[0];
        // console.log(this.company)
        localStorage.setItem('company', JSON.stringify(this.company));
      } else {
        this.company = new Company();
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
      // console.log(this.states)
    })
  }
  saveData(event) {
    this.company.CompanyId = this.companyId;
    this.company.BusinessTypeId = this.bussinessId;
    this.company.BusinessName = this.bussinessName;
    let url = "MasterDataApi/UpsertCompanyMaster";
    this.service.postData(event, url).subscribe((data: any) => {
      if (data) {
        alert('Saved Successfully');
        this.getCompanyDetails(this.companyId)
        if (this.isCheckForm == true) {
          this.isEdit = false;
          this.releaseLock();
        }
        if (this.isNodelLabelChange) {
          this.changeNode()
        }
      }
    })

  }
  getDocuments(type) {
    let data = {
      "DocumentInfo": [
        {
          "EntityCategory": "Master",
          "Entity": 'Company',
          "EntityId": null,
          "Type": type,
          "EntityParent": this.bussinessName + '/' + this.companyName,
          "FilesCount": 1,
          "ControlId": "ControlId-1"
        },
      ]
    }


    let url = "FilesApi/GetAllFilesforScreen_SF"
    this.service.postData(data, url).subscribe((data: any) => {
      //   console.log(data)
      if (type == "PAN") {
        if (data && data.AbsolutePath[0].DocumentsAbsolutePath.length != 0) {
          this.panDocumentPath = data.AbsolutePath[0].DocumentsAbsolutePath[0].AbsoluteFilePath;
        }

      } else if (type == "GSTIN") {
        if (data && data.AbsolutePath[0].DocumentsAbsolutePath.length != 0) {
          this.gstinDocumentPath = data.AbsolutePath[0].DocumentsAbsolutePath[0].AbsoluteFilePath;
        }

      } else if (type == "TAN") {
        if (data && data.AbsolutePath[0].DocumentsAbsolutePath.length != 0) {
          this.tanDocumentPath = data.AbsolutePath[0].DocumentsAbsolutePath[0].AbsoluteFilePath;
        }

      } else if (type == "CIN") {
        if (data && data.AbsolutePath[0].DocumentsAbsolutePath.length != 0) {
          this.cinDocumentPath = data.AbsolutePath[0].DocumentsAbsolutePath[0].AbsoluteFilePath;
        }

      }
    })

  }
  getCustomers() {
    let url = "MasterDataApi/GetMappedCustomersByCompanyStatus_SF"
    let data = { "BusinessId": this.bussinessId, "CompanyId": this.companyId, "Status": 1 }
    this.service.postData(data, url).subscribe((data: any) => {
      this.customers = data;
      //console.log(data)
    })
  }
  getVendors() {
    let url = "MasterDataApi/GetMappedVendorsByCompanyStatus_SF"
    let data = { "BusinessId": this.bussinessId, "CompanyId": this.companyId, "Status": 2 }
    this.service.postData(data, url).subscribe((data: any) => {
      this.vendors = data;
      //  console.log(data)
    })
  }
  getBanks() {
    let url = "MasterDataApi/GetAllMappedBankAccountsByEntityId_SF"
    let data = { "BusinessId": this.bussinessId, "Entity": 'Company', "EntityId": this.companyId, "Status": 2 }
    this.service.postData(data, url).subscribe((data: any) => {
      this.bankAccDetails = data;
      //   console.log(data)
    })
  }
  getBankBranchs() {
    let url = "MasterDataApi/GetAllBankAndBranch_SF"
    let data = { "Status": 1 }
    this.service.postData(data, url).subscribe((data: any) => {
      this.bankBranches = data;
      //   console.log(data)
    })
  }
  saveDocumentFiles($event) {
    this.document.BusinessId = this.bussinessId;
    this.document.BusinessName = this.bussinessName;
    this.document.ControlId = 'ControlId-1';
    this.document.Entity = 'Company';
    this.document.EntityCategory = 'Master';
    this.document.EntityParent = this.bussinessName + '/' + this.companyName
    this.document.EntityId = this.document.FileDetails.FilePath;
    this.document.FileDetails = $event;
    this.document.Type = $event.UploadedFileName;
    let url = 'MasterDataApi/SaveDocument';
    let data = this.document;
    this.service.postData(data, url).subscribe((data: any) => {
      if (data) {
        alert('Saved Successfully');
        this.getDocuments(this.document.Type)
      }
    })

  }
  saveBankDetails($event) {
    //  console.log($event)
    this.bankObj = $event;
    this.bankObj.Entity = 'Company';
    this.bankObj.EntityId = this.companyId;
    this.bankObj.BusinessId = this.bussinessId;
    let url = 'MasterDataApi/UpsertBankAccountByEntity ';
    let data = this.bankObj;
    this.service.postData(data, url).subscribe((data: any) => {
      if (data) {
        alert('Saved Successfully');
        this.getBanks();
      }
    })
  }
  saveCustomerDetails(event) {
    this.customers = event;
    let customerArray: any = [];
    let dummy = [
      { "CompanyId": this.companyId, "CustomerId": 'C001', "Status": 1 },
      { "CompanyId": this.companyId, "CustomerId": 'C002', "Status": 1 },
      { "CompanyId": this.companyId, "CustomerId": 'C003', "Status": 1 }
    ]

    this.customers.forEach(element => {
      if (element.Status == true) {
        element.Status = 1
      } else {
        element.Status = 0
      }
      customerArray.push({ 'CompanyId': this.companyId, 'CustomerId': element.CustomerId, 'Status': element.Status })
    });
    let data = {
      "BusinessId": this.bussinessId,
      "CompanyCustomer": customerArray
    }
    let url = 'MasterDataApi/UpsertCompanyCustomerMapping';
    this.service.postData(data, url).subscribe((data: any) => {

      if (data) {
        alert('Saved Successfully');
        this.getCustomers();
      }
    })
  }
  saveVendorDetails(event) {
    this.vendors = event;
    let vendorArray: any = []
    this.vendors.forEach(element => {
      if (element.Status == true) {
        element.Status = 1
      } else {
        element.Status = 0
      }
      vendorArray.push({ 'CompanyId': this.companyId, 'VendorId': element.VendorId, 'Status': element.Status })

    });
    let data = {
      "BusinessId": this.bussinessId,
      "CompanyVendor": vendorArray

    }
    let url = 'MasterDataApi/UpsertCompanyVendorMapping';
    this.service.postData(data, url).subscribe((data: any) => {
      if (data) {
        alert('Saved Successfully');
        this.getVendors();
        this.vendorForm.isChanged = false;
      }
    })
  }
  releaseLock() {
    let url = 'ManageTransactionLockApi/ReleaseContextLock';
    let obj = {
      "Type": 'Master',
      "LockContextType": 'Company',
      "LockContextValue": this.companyId,
      "UserID": 'A01_Administrator'
    }

    this.service.postData(obj, url).subscribe((data: any) => {
      this.isEdit = false;
    })
  }
  checkChanges() {

  }
  openDialog() {
    this.isCheckForm = true;
    this.dialog.open(this.statusDialog, { disableClose: true });
  }
  saveChanges() {
    if (this.companyForm.myForm.touched) {
      this.saveData(this.company)
    }
    if(this.documentsForm.files.length != 0){
      this.documentsForm.files.forEach(element => {
        this.saveDocumentFiles(element);
        this.documentsForm.clearAll();
      });
    }
    if(this.vendorForm.isChanged){
      this.saveVendorDetails(this.vendors)
    }
    if(this.customerForm.isChanged){
      this.saveCustomerDetails(this.customers)
    }
    this.closeDialog();
    this.isEdit = false;

  }
  discardChanges() {
    if (this.companyForm.myForm.touched) {
      this.companyForm.myForm.reset();
      this.getCustomers();
    }
    if(this.vendorForm.isChanged){
       this.getVendors();
    }
    if(this.customerForm.isChanged){
      this.getCustomers();
   }
   this.closeDialog();
   this.changeNode();
   this.isEdit = false;
  }
  closeDialog() {
    this.dialog.closeAll();
  }
  viewDetails() {

    if (this.companyForm.myForm.touched || this.documentsForm.files.length != 0 || this.vendorForm.isChanged || this.customerForm.isChanged) {
      this.openDialog();
    } else {
      this.isEdit = false;
      this.releaseLock();
    }

  }
  changeNode() {
    this.childrenNode = this.companyNode.Id;
    this.companyId = this.companyNode.Id;
    localStorage.setItem('companyId', this.companyNode.Id);
    this.companyName = this.companyNode.Name;
    localStorage.setItem('companyName', this.companyNode.Name);
    this.getCompanyDetails(this.companyNode.Id)

    this.dataSrc.filter(item => {
      item.Children.filter(child => {
        if (child.Id == this.companyNode.Id) {
          this.bussinessId = item.Id;
          localStorage.setItem('bussinessId', item.Id);
          this.bussinessName = item.Name;
          localStorage.setItem('bussinessName', item.Name);
          this.getAllData();
        }
      })
    })
  }
}
