import { Component, OnInit } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';

import { Vendor } from '../../../../shared/entities/vendor';
import { ModuleService } from '../../../module.service';
import { AppService } from '../../../../shared/service/app.service';
import { DocumentFiles } from '../../../../shared/entities/document';
import { Bank } from '../../../../shared/entities/bank';
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
  isEdit: boolean = true;
  isEditTab: boolean = false;
  vendorname: any;
  vendor: Vendor = new Vendor();

  states: any = [];
  document: DocumentFiles = new DocumentFiles();
  panDocumentPath: any
  tanDocumentPath: any;
  cinDocumentPath: any;
  gstinDocumentPath: any;
  agencys: any = [];
  bankBranches: any = [];
  bankObj: Bank = new Bank();
  bankAccDetails:any=[];
  constructor(private service: ModuleService, private appService: AppService) { }

  ngOnInit() {
    this.vendor.VendorName = history.state.data
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
    //===============================
    this.getStates();

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
  //==================================================//
  getStates() {
    let url = "MasterDataApi/GetAllStates_SF";
    this.service.getData({}, url).subscribe((data: any) => {
      console.log(data);
      this.states = data;
    })
  }
  saveData($event) {
    console.log($event);
    this.vendor = $event;
    let url = "MasterDataApi/UpsertVendorMaster";
    this.service.postData(this.vendor, url).subscribe((data: any) => {
      console.log(data);
      if (data != null) {
        this.appService.showMessage('Saved Successfully', 'X');
        //getVendorDetailsById
        let obj = { VendorId: data }
        let url = 'MasterDataApi/GetVendorMaster_SF';
        this.service.postData(obj, url).subscribe((data: any) => {
          console.log(data);
          if (data.length != 0) {
            this.vendor = data[0];
            console.log(this.vendor);
            this.isEditTab = true;
            this.getAgencyMapping();
            this.getBankBranchs();
          }

        })
      }
      else {
        this.appService.showMessage('Somethimg went wrong', 'X');
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
        //this.closeDialog();
      } else {
        this.appService.showMessage('Somethimg went wrong', 'X');
      }
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
  //AgencyMapping Details to perticular vendorid
  getAgencyMapping() {
    let status = 1;
    if (this.isEditTab == true) {
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
    agencyArray.push({ 'EntityId':this.vendor.VendorId, 'AgencyId': element.AgencyId, 'Status': element.Status })

  });
  let data = {
    "BusinessId": this.appService.businessId,
    "EntityAgency": agencyArray

  }
  let url = 'MasterDataApi/UpsertVendorAgencyMapping';
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
//getbankbrenchs
getBankBranchs() {

  let url = "MasterDataApi/GetAllBankAndBranch_SF"
  let data = { "Status": 1 }
  this.service.postData(data, url).subscribe((data: any) => {
    this.bankBranches = data;
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
      this.appService.showMessage('Saved Successfully','X');
      this.getBanks();
    }else{
      this.appService.showMessage('Something went wrong','X');
    }
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
checkPermissionAgencyEvent($event){
this.getAgencyMapping();
}
}


