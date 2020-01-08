import { Component, OnInit } from '@angular/core';
import {Business} from '../../../../shared/entities/business';
import { ModuleService } from '../../../module.service';
import { AppService } from '../../../../shared/service/app.service';
@Component({
  selector: 'app-view-business',
  templateUrl: './view-business.component.html',
  styleUrls: ['./view-business.component.css']
})
export class ViewBusinessComponent implements OnInit {
  height: any = 43;
  previousHeight: number = 43;
  innerHeight: number;
  width: number = 70;
  maxHeight: number;
  restoreHeight: number;
  selectedTab: any = 0;
  
  dataSrc: any = [];
  isEdit: boolean = false;
  business: Business = new Business();
  

  isNodelLabelChange: boolean = false;
  childrenNode: any;
  status: any;
  constructor(private service:ModuleService,private appService: AppService) { }

  ngOnInit() {
    this.getTreeData()
  }
  minWidth() {
    this.width = 40;

  }
  maxWidth() {
    this.width = 70;
  }
  getTreeData() {
    let object = {
      "SchemaName":'dbo',
      "EntityCategory":'Master',
      "Entity":'BUSINESSTYPE',
      "ReturnType":'TREE'
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
    if (node) {
      localStorage.setItem('nodeLabel', node);
      this.childrenNode = node;
      this.isNodelLabelChange = true;
    }
   // this.releaseLock();
    this.businessDetailsById();

  }
  businessDetailsById() {
    let obj = {
      "BusinessStatus": this.childrenNode.Id,
    
    }
    
    let url = 'MasterDataApi/GetBusinessTypeByStatus_SF';
    this.service.postData(obj, url).subscribe((data: any) => {
      console.log(data);
      if (data.length != 0) {
        this.business = data[0];
      }
    })
  }
  refresh() {
    this.getTreeData();
  }
  // checkPermission() {

  //   let url = 'ManageTransactionLockApi/SetContextLock';
  //   let obj = {
  //     "Type": 'Master',
  //     "LockContextType": 'Agency',
  //     "LockContextValue": this.agency.AgencyId,
  //     "UserID": 'A01_Administrator'
  //   }

  //   this.service.postData(obj, url).subscribe((data: any) => {
  //     this.isEdit = data.Status;

  //   })

  // }
  // releaseLock() {
  //   let url = 'ManageTransactionLockApi/ReleaseContextLock';
  //   let obj = {
  //     "Type": 'Master',
  //     "LockContextType": 'Agency',
  //     "LockContextValue": this.childrenNode.Id,
  //     "UserID": 'A01_Administrator'
  //   }

  //   this.service.postData(obj, url).subscribe((data: any) => {

  //     if (data = "Released") {
  //       this.isEdit = false;
  //       console.log('hi12');
  //     }
  //     else {

  //       console.log('hi123');
  //     }
  //   })
  // }

}
