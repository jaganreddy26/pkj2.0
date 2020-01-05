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
import { AppService } from '../../../shared/service/app.service';


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
  nodeArray:any=[];
  constructor(private router: Router, private service: ModuleService, private dialog: MatDialog,private appService:AppService) {
    this.getStates();
    this.getLocalStorage();
    this.releaseLock();
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
    if (localStorage.getItem('businessTree')) {
      this.treeArray = JSON.parse(localStorage.getItem('businessTree'));
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
    if (this.height != window.innerHeight - 90) {
      this.height = window.innerHeight - 90;
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
    this.releaseLock();
    // if (this.companyForm.myForm.touched || this.documentsForm.files.length != 0 || this.vendorForm.isChanged || this.customerForm.isChanged) {
    //   this.openDialog();
     
    // } 

  }
  dataNode(node) {
    this.nodeArray = node;
    localStorage.setItem('businessTree', JSON.stringify(this.nodeArray))
console.log(this.nodeArray);
  }
  nodeLabel(node) {
    console.log(node);
    this.companyNode = node;
    this.isNodelLabelChange = true;
    // console.log(this.documentsForm.files)
    if (this.companyForm.myForm.touched || this.documentsForm.files.length != 0 || this.vendorForm.isChanged || this.customerForm.isChanged) {
      this.openDialog();
    } else {
      this.changeNode()

    }

  }
  getCompanyDetails(node) {
    console.log("hi4");
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
        this.appService.showMessage('Saved Successfully','X');
        this.getCompanyDetails(this.companyId)
        if (this.isCheckForm == true) {
          this.isEdit = false;
          this.releaseLock();
        }
      }else{
        this.appService.showMessage('Something went wrong','X')
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
          "DocumentType": type,
          "EntityParent": this.bussinessName,
          "BusinesTypes":'Busines Types',          
          "FilesCount": 1,
          "EntityType":'',          
          "ControlId": "ControlId-1"
        },
      ]
    }


    let url = "FilesApi/GetAllFilesforScreen_SF" 
    this.service.postData(data, url).subscribe((data: any) => {
      // console.log(data)
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
  getCustomers() {
    let status = 1;
    if(this.isEdit == true){
      status = 2;
    }else{
      status = 1;
    }
    let url = "MasterDataApi/GetMappedCustomersByCompanyStatus_SF"
    let data = { "BusinessId": this.bussinessId, "CompanyId": this.companyId, "Status": status }
    this.service.postData(data, url).subscribe((data: any) => {
      this.customers = data;
      //console.log(data)
    })
  }
  getVendors() {
    let status = 1;
    if(this.isEdit == true){
      status =2;
    }else{
      status = 1;
    }
    let url = "MasterDataApi/GetMappedVendorsByCompanyStatus_SF"
    let data = { "BusinessId": this.bussinessId, "CompanyId": this.companyId, "Status": status }
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
    console.log("hi1");
    let url = "MasterDataApi/GetAllBankAndBranch_SF"
    let data = { "Status": 1 }
    this.service.postData(data, url).subscribe((data: any) => {
      this.bankBranches = data;
      //   console.log(data)
    })
  }
  saveDocumentFiles($event) {
   console.log($event)
    this.document.BusinessId = this.bussinessId;
    this.document.BusinessName = this.bussinessName;
    this.document.ControlId = 'ControlId-1';
    this.document.Entity = 'Company';
    this.document.EntityCategory = 'Master';
    this.document.EntityParent = this.bussinessName;
    this.document.EntityName = this.document.FileDetails.FilePath;
    this.document.FileDetails = $event;
    this.document.DocumentType = $event.UploadedFileName;
    this.document.BusinesTypes = 'Busines Types';
    let url = 'MasterDataApi/SaveDocument';
    let data = this.document;
    this.service.postData(data, url).subscribe((data: any) => {
      if (data) {
        this.appService.showMessage('Saved Successfully','X');
        this.getDocuments(this.document.DocumentType)
        this.closeDialog();
      }else{
        this.appService.showMessage('Somethimg went wrong','X');
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
        this.appService.showMessage('Saved Successfully','X');
        this.getBanks();
      }else{
        this.appService.showMessage('Something went wrong','X');
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
        this.appService.showMessage('Saved Successfully','X');
        this.getCustomers();
      }else{
        this.appService.showMessage('Something went wrong','X');
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
        this.appService.showMessage('Saved Successfully','X');
        this.getVendors();
        this.vendorForm.isChanged = false;
      }else{
        this.appService.showMessage('Something went wrong','X');
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
    if (this.documentsForm.files.length != 0) {
      this.documentsForm.files.forEach(element => {
        this.saveDocumentFiles(element);
        setTimeout(()=>{
          this.documentsForm.clearAll();
        },2000)
      });
    }
    if (this.vendorForm.isChanged) {
      this.saveVendorDetails(this.vendors)
    }
    if (this.customerForm.isChanged) {
      this.saveCustomerDetails(this.customers)
    }
    if (this.isNodelLabelChange) {
      this.changeNode();
    }
    this.closeDialog();
    this.isEdit = false;
    return true;

  }
  discardChanges() {
    if (this.companyForm.myForm.touched) {
      this.companyForm.myForm.reset();
      this.getCustomers();
    }
    if (this.vendorForm.isChanged) {
      this.getVendors();
    }
    if (this.customerForm.isChanged) {
      this.getCustomers();
    }
    if (this.documentsForm.files.length != 0) {
      this.documentsForm.clearAll();
    }
    this.closeDialog();
    if (this.isNodelLabelChange) {
      this.changeNode();
    }
    this.isEdit = false;
    return true;
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
  checkPermissionCustomerEvent($event){
    this.getCustomers()
  }
  checkPermissionVendorEvent($event){
    this.getVendors()
  }
}
