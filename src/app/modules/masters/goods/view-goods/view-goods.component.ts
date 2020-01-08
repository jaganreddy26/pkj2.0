import { Component, OnInit,ViewChild,TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import {Goods} from '../../../../shared/entities/goods';
import { ModuleService } from '../../../module.service';
import { AppService } from '../../../../shared/service/app.service';
import { ResizeEvent } from 'angular-resizable-element';
import { GoodsFormComponent } from '../goods-form/goods-form.component';
@Component({
  selector: 'app-view-goods',
  templateUrl: './view-goods.component.html',
  styleUrls: ['./view-goods.component.css']
})
export class ViewGoodsComponent implements OnInit {
  @ViewChild(GoodsFormComponent, { static: false }) viewGoodsForm: GoodsFormComponent;
  @ViewChild('statusDialog', { static: true }) statusDialog: TemplateRef<any>;
  height: any = 43;
  previousHeight: number = 43;
  innerHeight: number;
  width: number = 70;
  maxHeight: number;
  restoreHeight: number;
  selectedTab: any = 0;
  isCheckForm: boolean = false;

  dataSrc: any = [];
  isEdit: boolean = false;
  goods: Goods = new Goods();

  isNodelLabelChange: boolean = false;
  childrenNode: any;
  status:any;
 
  constructor(private service: ModuleService,private dialog: MatDialog, private appService: AppService,) { }

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
  getTreeData() {
    let object = {
      "SchemaName":'dbo',
      "EntityCategory":'Master',
      "Entity":'GOODS',
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
    if (this.viewGoodsForm.myForm.touched) {
      this.openDialog();
    } else {
      this.changeNode()

    }
  

  }
  changeNode() {
    this.releaseLock()
    this.goodsDetailsById();
  }
  goodsDetailsById() {
    let obj = {
    "GoodsId": this.childrenNode.Id, 
    "_Status": 2 
  }
    let url = 'MasterDataApi/GetGoodsTypeMaster_SF';
    this.service.postData(obj,url).subscribe((data:any)=>{
      console.log(data);
      if (data.length != 0) {
        this.goods = data[0];
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
      "LockContextType": 'Goods',
      "LockContextValue": this.goods.GoodsId,
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
      "LockContextType": 'Goods',
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
      "GoodsId":$event.GoodsId,
      "GoodsName":$event.GoodsName,
      "GoodsType":$event.GoodsType,
      "Status":this.status,
      "PreviousStatus":0
      
    }
    let url='MasterDataApi/UpsertGoodsTypeMaster';
    this.service.postData(object,url).subscribe((data:any)=>{
      console.log(data);
      if (data != null) {
        this.appService.showMessage('Saved Successfully', 'X');
      
      }
      else{
        this.appService.showMessage('Somethimg went wrong', 'X');
      }
    })
  }
  viewDetails() {

    if (this.viewGoodsForm.myForm.touched) {
      this.openDialog();
    } else {
      this.isEdit = false;
      this.releaseLock();
    }

//    this.releaseLock();
  }
 
  discardChanges() {

   // if (this.viewGoodsForm.myForm.touched) {
      this.viewGoodsForm.myForm.reset();
      this.goodsDetailsById();
      this.closeDialog();
      return true;
   // }
    //this.closeDialog();
  }
  openDialog() {
    this.isCheckForm = true;
    this.dialog.open(this.statusDialog, { disableClose: true });
  }
  saveChanges() {
//console.log("savedata");
    // if (this.viewGoodsForm.myForm.touched) {
     // console.log("savedatain");
      this.saveData(this.goods);
      this.closeDialog();
      this.isEdit = false;
      this.viewGoodsForm.myForm.reset();
      return true;
   // }
    
  }
  closeDialog() {
    this.dialog.closeAll();
  }
}
