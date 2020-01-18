import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';

import { Vendor } from '../../../../shared/entities/vendor';
import { ModuleService } from '../../../module.service';
import { AppService } from '../../../../shared/service/app.service';
import { DocumentFiles } from '../../../../shared/entities/document';
import { Bank } from '../../../../shared/entities/bank';
import { VendorFormComponent } from '../vendor-form/vendor-form.component';
import { DocumentsComponent } from '../../../company/documents/documents.component';
import { AgencyComponent } from '../../../../modules/agency/agency.component';
import { BankComponent } from '../../../company/bank/bank.component';
import { GoodsComponent } from '../../../../modules/goods/goods.component'
import { ServiceComponent } from '../../../../modules/service/service.component';
import { MatDialog } from '@angular/material';
import { AppComponent } from '../../../../app.component';

@Component({
  selector: 'app-view-vendor-details',
  templateUrl: './view-vendor-details.component.html',
  styleUrls: ['./view-vendor-details.component.css']
})
export class ViewVendorDetailsComponent implements OnInit {
  @ViewChild(VendorFormComponent, { static: false }) vedorForm: VendorFormComponent;
  @ViewChild(DocumentsComponent, { static: false }) documentsForm: DocumentsComponent;
  @ViewChild(AgencyComponent, { static: false }) agencyForm: AgencyComponent;
  @ViewChild(BankComponent, { static: false }) bankForm: BankComponent;
  @ViewChild(GoodsComponent, { static: false }) goodsForm: GoodsComponent;
  @ViewChild(ServiceComponent, { static: false }) serviceForm: ServiceComponent;

  // @ViewChild('statusDialog', { static: true }) statusDialog: TemplateRef<any>;
  height: any = 43;
  previousHeight: number = 43;
  innerHeight: number;
  width: number = 25;
  maxHeight: number;
  restoreHeight: number;
  selectedTab: any = 0;
  isEdit: boolean = false;

  vendorname: any;
  vendor: Vendor = new Vendor();

  dataSrc: any = [];
  isNodelLabelChange: boolean = false;
  childrenNode: any;

  states: any = [];
  document: DocumentFiles = new DocumentFiles();
  panDocumentPath: any
  tanDocumentPath: any;
  cinDocumentPath: any;
  gstinDocumentPath: any;
  agencys: any = [];
  bankBranches: any = [];
  bankObj: Bank = new Bank();
  bankAccDetails: any = [];
  goods: any = [];
  serviceMappingDetails: any = [];

  isCheckForm: boolean = false;
  constructor(private service: ModuleService, private appService: AppService,
    private dialog: MatDialog,private appComponent: AppComponent) { }
    @ViewChild('statusDialog', { static: true }) statusDialog: TemplateRef<any>;
  ngOnInit() {
    // this.vendor.VendorName = history.state.data
    // this.vendorname = history.state.data;
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
    this.getTreeData();

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
  tabChange(event) {
    // console.log(event)
    this.selectedTab = event.index;
  }
  restore() {
    this.height = (window.innerHeight) / 2.2;
    this.restoreHeight = (window.innerHeight) / 2.2;
  }
  //==================
  getStates() {
    let url = "MasterDataApi/GetAllStates_SF";
    this.service.getData({}, url).subscribe((data: any) => {
      console.log(data);
      this.states = data;
    })
  }
  ///tree data
  refresh() {
    this.getTreeData();
  }
  getTreeData() {
    let obj = {
      "SchemaName": "dbo",
      "EntityCategory": "Master",
      "Entity": "VENDOR",
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
      "LockContextType": 'Vendor',
      "LockContextValue": this.vendor.VendorId,
      "UserID": 'A01_Administrator'
    }

    this.service.postData(obj, url).subscribe((data: any) => {
      this.isEdit = data.Status;

    })

  }
  viewDetails() {
    //  this.releaseLock();
    debugger;
    console.log(this.vedorForm.myForm.touched);
    if (this.vedorForm.myForm.touched
      || this.documentsForm.files.length != 0
      || this.agencyForm.isChanged
      || this.bankForm.myForm
      || this.goodsForm.isChanged
      || this.serviceForm.isChanged) {
      this.openDialog();
    } else {
      this.isEdit = false;
      this.releaseLock();
    }
  }

  releaseLock() {
    let url = 'ManageTransactionLockApi/ReleaseContextLock';
    let obj = {
      "Type": 'Master',
      "LockContextType": 'Vendor',
      "LockContextValue": this.vendor.VendorId,
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

  nodeLabel(node) {
    this.isEdit = false;
    // console.log(node);
    // if (node) {
    //   localStorage.setItem('nodeLabel', node);
    this.childrenNode = node;
    this.isNodelLabelChange = true;
    //}
    if (this.vedorForm.myForm.touched
      || this.documentsForm.files.length != 0
      || this.agencyForm.isChanged
      || this.goodsForm.isChanged
      || this.serviceForm.isChanged
    ) {
      this.openDialog();
    } else {
      this.changeNode()

    }


  }
  changeNode() {
    this.releaseLock()
    this.VendorDetailsById();
  }
  openDialog() {
    this.isCheckForm = true;
    this.dialog.open(this.statusDialog, { disableClose: true });
  }
  VendorDetailsById() {
    let obj = { VendorId: this.childrenNode.Id }
    let url = 'MasterDataApi/GetVendorMaster_SF'
    this.service.postData(obj, url).subscribe((data: any) => {
      console.log(data);
      if (data.length != 0) {
        this.vendor = data[0];

        console.log(this.vendor);
        this.getStates();
        this.viewDetails();
        this.getAgencyMapping();
        this.getGoodsMapping();
        this.getServiceMapping();
        this.getDocuments('PAN');
        this.getDocuments('TAN');
        this.getDocuments('GSTIN');
        this.getDocuments('CIN');
        console.log(this.childrenNode.Id);
        this.getBanks();
        this.agencys = [];
        this.getBankBranchs();
      }

    })
  }

  saveData($event) {
    console.log($event);
    //this.vendor = $event;
    let object = {
      "VendorId": $event.VendorId,
      "VendorName": $event.VendorName,
      "Email1": $event.Email1,
      "Email2": $event.Email2,
      "URL": $event.URL,
      "Phone1": $event.Phone1,
      "Phone2": $event.Phone2,
      "Fax": $event.Fax,
      "Address1": $event.Address1,
      "Address2": $event.Address2,
      "Address3": $event.Address3,
      "StateId": $event.StateId,
      "CIN": $event.CIN,
      "GSTIN": $event.GSTIN,
      "PAN": $event.PAN,
      "TAN_NO": $event.TAN_NO,
      "Status": $event.Status,
      "PreviousStatus": 1,
      "IsSource": $event.IsSource

    }
    console.log(object);
    let url = "MasterDataApi/UpsertVendorMaster";
    this.service.postData(object, url).subscribe((data: any) => {
      console.log(data);
      if (data != null) {
        this.appService.showMessage('Saved Successfully', 'X');
        if (this.isCheckForm == true) {
          this.isEdit = false;
          this.releaseLock();
        }
        //getVendorDetailsById
        let obj = { VendorId: data }
        let url = 'MasterDataApi/GetVendorMaster_SF';
        this.service.postData(obj, url).subscribe((data: any) => {
          console.log(data);
          if (data.length != 0) {
            this.vendor = data[0];
            console.log(this.vendor);

            // this.getAgencyMapping();
            this.getBankBranchs();
            // this.getGoodsMapping();
          }

        })
      }
      else {
        this.appService.showMessage('Somethimg went wrong', 'X');
      }
    })
  }
  //get documents
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
          "EntityType": 'Vendor',
          "EntityName": this.vendor.VendorId + '_' + this.vendor.VendorName,
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
  /////////-Saving the documents-////////
  saveDocumentFiles($event) {
    console.log($event);
    this.document.EntityCategory = 'Master';
    this.document.BusinessId = '';
    this.document.BusinessName = '';
    this.document.CompanyId = '';
    this.document.CompanyName = '';
    this.document.BusinesTypes = '';
    this.document.EntityParent = '';
    this.document.EntityType = 'Vendor';
    this.document.EntityName = this.vendor.VendorId + '_' + this.vendor.VendorName;
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
        this.closeDialog();
      } else {
        this.appService.showMessage('Somethimg went wrong', 'X');
      }
    })
  }

  checkPermissionAgencyEvent($event) {
    this.getAgencyMapping();
  }
  //AgencyMapping Details to perticular vendorid
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
      "Entity": "Vendor",
      "EntityId": this.vendor.VendorId,
      "Status": status
    }

    let agencyUrl = 'MasterDataApi/GetMappedAgencyByEntityStatus_SF';
    this.service.postData(agencyInputobj, agencyUrl).subscribe((data: any) => {
      console.log(data);
      this.agencys = data;
    })
  }
  ///svaing Agency details...
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
      agencyArray.push({ 'EntityId': this.vendor.VendorId, 'AgencyId': element.AgencyId, 'Status': element.Status })

    });
    let data = {
      "BusinessId": this.appService.businessId,
      "EntityAgency": agencyArray

    }
    let url = 'MasterDataApi/UpsertVendorAgencyMapping';
    this.service.postData(data, url).subscribe((data: any) => {
      console.log();
      if (data) {
        this.appService.showMessage('Saved Successfully', 'X');
        this.getAgencyMapping();
        this.agencyForm.isChanged = false;
      } else {
        this.appService.showMessage('Something went wrong', 'X');
      }
    })
  }
  //getbankbrenchs
  getBankBranchs() {

    let url = "MasterDataApi/GetAllBankAndBranch_SF"
    let data = { "Status": 1 }
    this.service.postData(data, url).subscribe((data: any) => {
      this.bankBranches = data;
      //   console.log(data)
    })
  }
  //get Addedbanks to this Vendor;
  getBanks() {
    let url = "MasterDataApi/GetAllMappedBankAccountsByEntityId_SF"
    let data = { "BusinessId": '', "Entity": 'Vendor', "EntityId": this.vendor.VendorId, "Status": 2 }
    this.service.postData(data, url).subscribe((data: any) => {
      this.bankAccDetails = data;
      //   console.log(data)
    })
  }
  //saving bank details
  saveBankDetails($event) {
    //  console.log($event)
    this.bankObj = $event;
    this.bankObj.Entity = 'Vendor';
    this.bankObj.EntityId = this.vendor.VendorId;
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
  checkGoodsPermissionEvent($event) {
    this.getGoodsMapping();
  }

  //get goodsmapping data
  getGoodsMapping() {
    let status = 1;
    if (this.isEdit == true) {
      status = 2;
    } else {
      status = 1;
    }

    let goodsInputobj =
    {
      "BusinessId": this.appService.businessId,
      "EntityId": this.vendor.VendorId,
      "Status": status
    }

    let goodsUrl = 'MasterDataApi/GetMappedGoodsByVendorStatus_SF';
    this.service.postData(goodsInputobj, goodsUrl).subscribe((data: any) => {
      console.log(data);
      this.goods = data;
    })
  }
  //save Goods Details
  saveGoodsDetails($event) {
    this.goods = $event;
    let goodsArray: any = []
    this.goods.forEach(element => {
      if (element.Status == true) {
        element.Status = 1
      } else {
        element.Status = 0
      }
      goodsArray.push({ 'VendorId': this.vendor.VendorId, 'GoodsId': element.GoodsId, 'Status': element.Status })

    });
    let data = {
      "BusinessId": this.appService.businessId,
      "VendorGoods": goodsArray
    }
    let url = 'MasterDataApi/UpsertVendorGoodsMapping';
    this.service.postData(data, url).subscribe((data: any) => {
      console.log();
      if (data) {
        this.appService.showMessage('Saved Successfully', 'X');
        this.getGoodsMapping();
        this.goodsForm.isChanged = false;
      } else {
        this.appService.showMessage('Something went wrong', 'X');
      }
    })
  }

  checkServicePermissionEvent($event) {
    this.getServiceMapping();
  }
  //get ServiceMapping data
  getServiceMapping() {
    let status = 1;
    if (this.isEdit == true) {
      status = 2;
    } else {
      status = 1;
    }

    let servicesInputobj =
    {
      "BusinessId": this.appService.businessId,
      "EntityId": this.vendor.VendorId,
      "Status": status
    }

    let Url = 'MasterDataApi/GetMappedServicesByVendorStatus_SF';
    this.service.postData(servicesInputobj, Url).subscribe((data: any) => {
      console.log(data);
      this.serviceMappingDetails = data;
    })
  }
  saveServicesDetails($event) {
    this.serviceMappingDetails = $event;
    let serviceArray: any = [];
    this.serviceMappingDetails.forEach(element => {
      if (element.Status == true) {
        element.Status = 1
      } else {
        element.Status = 0
      }
      serviceArray.push({ 'VendorId': this.vendor.VendorId, 'ServiceId': element.ServiceId, 'Status': element.Status })

    });
    let data = {
      "BusinessId": this.appService.businessId,
      "VendorService": serviceArray
    }
    let url = 'MasterDataApi/UpsertVendorServiceMapping';
    this.service.postData(data, url).subscribe((data: any) => {
      console.log();
      if (data) {
        this.appService.showMessage('Saved Successfully', 'X');
        this.getServiceMapping();
        this.serviceForm.isChanged = false;
      } else {
        this.appService.showMessage('Something went wrong', 'X');
      }
    })
  }
  saveChanges() {
    debugger;
    console.log(this.vedorForm.myForm.touched);
    if (this.vedorForm.myForm.touched) {
      this.saveData(this.vendor);
      this.vedorForm.myForm.reset();
    }
    console.log(this.vedorForm.myForm.touched);
    if (this.documentsForm.files.length != 0) {
      this.documentsForm.files.forEach(element => {
        this.saveDocumentFiles(element);
        setTimeout(() => {
          this.documentsForm.clearAll();
        }, 2000)
      });
      this.documentsForm.clearAll(); 
    }
    if (this.agencyForm.isChanged) {
      this.saveAgencyDetails(this.agencys);
      this.agencyForm.isChanged = false;

    }
    if (this.goodsForm.isChanged) {
      this.saveGoodsDetails(this.goods);
      this.goodsForm.isChanged = false;
    }
    if (this.serviceForm.isChanged) {
      this.saveServicesDetails(this.serviceMappingDetails)
      this.serviceForm.isChanged = false;
    }
    if (this.isNodelLabelChange) {
      this.changeNode();
    }
    this.closeDialog();
    this.isEdit = false;
    return true;
  }

  discardChanges() {

    if (this.vedorForm.myForm.touched) {
      this.vedorForm.myForm.reset();
      this.VendorDetailsById();
    }
    if (this.agencyForm.isChanged) {
      this.getAgencyMapping();
    }
    if (this.goodsForm.isChanged) {
      this.getGoodsMapping();
    }
    if (this.serviceForm.isChanged) {
      this.getServiceMapping();
    }
    if (this.documentsForm.files.length != 0) {
      this.documentsForm.clearAll();
    }
    this.closeDialog();
    if (this.isNodelLabelChange) {
      this.changeNode();
    }
    this.isEdit = false;
    this.vedorForm.myForm.reset();
    return true;
  }
  closeDialog() {
    this.dialog.closeAll();
  }
}
