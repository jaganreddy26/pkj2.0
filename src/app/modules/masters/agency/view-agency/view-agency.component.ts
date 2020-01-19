import { Component, OnInit,ViewChild,TemplateRef } from '@angular/core';
import { Agency } from '../../../../shared/entities/agency';
import { ModuleService } from '../../../module.service';
import { AppService } from '../../../../shared/service/app.service';
import { ResizeEvent } from 'angular-resizable-element';
import {AgencyFormComponent} from '../agency-form/agency-form.component';
import { MatDialog } from '@angular/material';
import { AppComponent } from '../../../../app.component';
@Component({
  selector: 'app-view-agency',
  templateUrl: './view-agency.component.html',
  styleUrls: ['./view-agency.component.css']
})
export class ViewAgencyComponent implements OnInit {
  @ViewChild(AgencyFormComponent, { static: false }) agencyForm: AgencyFormComponent;
  @ViewChild('statusDialog', { static: true }) statusDialog: TemplateRef<any>;
  height: any = 43;
  previousHeight: number = 43;
  innerHeight: number;
  width: number =25;
  maxHeight: number;
  restoreHeight: number;
  selectedTab: any = 0;

  dataSrc: any = [];
  isEdit: boolean = false;
  agency: Agency = new Agency();

  isNodelLabelChange: boolean = false;
  childrenNode: any;
  status: any;
  isCheckForm: boolean = false;
  constructor(private service: ModuleService, private appService: AppService,
    private dialog: MatDialog,private appComponent:AppComponent  ) { }

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
      "Entity": 'AGENCY',
      "ReturnType": 'TREE'
    }
    let URL = 'Tree/GetTree_SF';
    this.service.postData(object, URL).subscribe((data: any) => {
      console.log(data);
      this.dataSrc = data.RecursiveObjects;
      console.log(this.dataSrc);
    })
  }


  nodeLabel(node) {
    this.isEdit = false;
    console.log(node);
    this.isNodelLabelChange = true;
    if (node) {
      localStorage.setItem('nodeLabel', node);
      this.childrenNode = node;
  
    }
   // alert(this.agencyForm.myForm.touched)
    if (this.agencyForm.myForm.touched) {
      this.openDialog();
    } else {
      this.changeNode();

    }

  }
  changeNode() {
    this.releaseLock()
    this.agencyDetailsById();
  }
  agencyDetailsById() {
    let obj = {
      "AgencyId": this.childrenNode.Id,
      "_Status": 2
    }
    let url = 'MasterDataApi/GetAgencyMaster_SF';
    this.service.postData(obj, url).subscribe((data: any) => {
      console.log(data);
      if (data.length != 0) {
        this.agency = data[0];
      }
    })
  }
  refresh() {
    this.getTreeData();
  }
  checkPermission() {

    let url = 'ManageTransactionLockApi/SetContextLock';
    let obj = {
      "Type": 'Master',
      "LockContextType": 'Agency',
      "LockContextValue": this.agency.AgencyId,
      "UserID": 'A01_Administrator'
    }

    this.service.postData(obj, url).subscribe((data: any) => {
      this.isEdit = data.Status;

    })

  }
  releaseLock() {
    let url = 'ManageTransactionLockApi/ReleaseContextLock';
    let obj = {
      "Type": 'Master',
      "LockContextType": 'Agency',
      "LockContextValue": this.childrenNode.Id,
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
  saveData($event) {
    if ($event.Status == true) {
      this.status = 1
    }
    else {
      this.status = 0
    }
    let object = {
      "AgencyId": $event.AgencyId,
      "AgencyName": $event.AgencyName,
      "Email1": $event.Email1,
      "Email2": $event.Email2,
      "Phone1": $event.Phone1,
      "Phone2": $event.Phone2,
      "Status": this.status,
      'PreviousStatus': 0
    }
    let url = 'MasterDataApi/UpsertAgencyMaster';
    this.service.postData(object, url).subscribe((data: any) => {
      console.log(data);
      if (data != null) {
        this.appService.showMessage('Saved Successfully', 'X');
        this.isEdit = false;
        this.agencyForm.myForm.reset();
      }
      else {
        this.appService.showMessage('Somethimg went wrong', 'X');
      }
    })
  }
  viewDetails() {
    alert(this.agencyForm.myForm.touched)
    if (this.agencyForm.myForm.touched) {
      this.openDialog();
    } else {
      this.isEdit = false;
      this.releaseLock();
    }
  }
  openDialog() {
    this.isCheckForm = true;
    this.dialog.open(this.statusDialog, { disableClose: true });
  }
  saveChanges() {
    //console.log("savedata");
       //  if (this.agencyForm.myForm.touched) {
         // console.log("savedatain");
       //  alert(this.agencyForm.myForm.touched)
          this.saveData(this.agency);
          this.closeDialog();
          this.isEdit = false;
          this.agencyForm.myForm.reset();
          return true;
   // }
    
      }
      closeDialog() {
        this.dialog.closeAll();
      }
      discardChanges() {

        if (this.agencyForm.myForm.touched) {
          alert(this.agencyForm.myForm.touched)
           this.agencyForm.myForm.reset();
           this.agencyDetailsById();
           this.closeDialog();
           return true;
        }
         //this.closeDialog();
       }
}
