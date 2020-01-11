import { Component, OnInit,ViewChild,TemplateRef } from '@angular/core';
import { Service } from '../../../../shared/entities/service';
import { ModuleService } from '../../../module.service';
import { AppService } from '../../../../shared/service/app.service';
import { ResizeEvent } from 'angular-resizable-element';
import {ServiceFormComponent} from '../service-form/service-form.component';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-view-service',
  templateUrl: './view-service.component.html',
  styleUrls: ['./view-service.component.css']
})
export class ViewServiceComponent implements OnInit {
  @ViewChild(ServiceFormComponent, { static: false }) viewServiceForm: ServiceFormComponent;
  @ViewChild('statusDialog', { static: true }) statusDialog: TemplateRef<any>;
  height: any = 43;
  previousHeight: number = 43;
  innerHeight: number;
  width: number = 25;
  maxHeight: number;
  restoreHeight: number;
  selectedTab: any = 0;

  dataSrc: any = [];
  isEdit: boolean = false;
  service: Service = new Service();

  isNodelLabelChange: boolean = false;
  childrenNode: any;
  status: any;

  isCheckForm: boolean = false;
  constructor(private modelservice: ModuleService, private appService: AppService,
    private dialog: MatDialog) { }

  ngOnInit() {
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
      this.height = 43;
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
  getTreeData() {
    let object = {
      "SchemaName": 'dbo',
      "EntityCategory": 'Master',
      "Entity": 'service',
      "ReturnType": 'TREE'
    }
    let URL = 'Tree/GetTree_SF';
    this.modelservice.postData(object, URL).subscribe((data: any) => {
      console.log(data);
      this.dataSrc = data.RecursiveObjects;
      console.log(this.dataSrc);
    })
  }
  nodeLabel(node) {
    this.isEdit = false;
    console.log(node);
    if (node) {
      localStorage.setItem('nodeLabel', node);
      this.childrenNode = node;
      this.isNodelLabelChange = true;
    }

    if (this.viewServiceForm.myForm.touched) {
      this.openDialog();
    } else {
      this.changeNode();

    }

  }
  changeNode() {
    this.releaseLock()
    this.serviceDetailsById();
  }
  serviceDetailsById() {
    let obj = {
      "ServiceId": this.childrenNode.Id,
      "_Status": 2
    }
    let url = 'MasterDataApi/GetServiceTypeMaster_SF';
    this.modelservice.postData(obj, url).subscribe((data: any) => {
      console.log(data);
      if (data.length != 0) {
        this.service = data[0];
      }
    })
  }
  checkPermission() {

    let url = 'ManageTransactionLockApi/SetContextLock';
    let obj = {
      "Type": 'Master',
      "LockContextType": 'Service',
      "LockContextValue": this.childrenNode.Id,
      "UserID": 'A01_Administrator'
    }

    this.modelservice.postData(obj, url).subscribe((data: any) => {
      this.isEdit = data.Status;

    })

  }
  refresh() {
    this.getTreeData();
  }
  viewDetails() {
    if (this.viewServiceForm.myForm.touched) {
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
      "LockContextType": 'Service',
      "LockContextValue": this.childrenNode.Id,
      "UserID": 'A01_Administrator'
    }

    this.modelservice.postData(obj, url).subscribe((data: any) => {

      if (data = "Released") {
        this.isEdit = false;
      }
      else {
      }
    })
  }
  saveData($event) {
    if ($event.Status == true) {
      this.status = 1
    }
    else {
      this.status = 0
    }
    let object = {
      "ServiceId":$event.ServiceId,
      "ServiceName": $event.ServiceName,
      "ServiceType":$event.ServiceType,
      "Status": this.status,
      "PreviousStatus":1
    }
    let url = 'MasterDataApi/UpsertServiceTypeMaster';
    this.modelservice.postData(object, url).subscribe((data: any) => {
      console.log(data);
      if (data != null) {
        this.appService.showMessage('Saved Successfully', 'X');
      }
      else {
        this.appService.showMessage('Somethimg went wrong', 'X');
      }
    })
  }
  openDialog() {
    this.isCheckForm = true;
    this.dialog.open(this.statusDialog, { disableClose: true });
  }
  saveChanges() {
    //console.log("savedata");
        // if (this.viewGoodsForm.myForm.touched) {
         // console.log("savedatain");
          this.saveData(this.service);
          this.closeDialog();
          this.isEdit = false;
          this.viewServiceForm.myForm.reset();
          return true;
       // }
        
      }
      closeDialog() {
        this.dialog.closeAll();
      }
      discardChanges() {

        // if (this.viewGoodsForm.myForm.touched) {
           this.viewServiceForm.myForm.reset();
           this.serviceDetailsById();
           this.closeDialog();
           return true;
        // }
         //this.closeDialog();
       }
}
