import { Component, OnInit ,TemplateRef,ViewChild, ɵConsole} from '@angular/core';
import { masterBank } from '../../../../shared/entities/masterBank';
import { ModuleService } from '../../../module.service';
import { AppService } from '../../../../shared/service/app.service';
import { ResizeEvent } from 'angular-resizable-element';
import {BankFormComponent} from '../../bank/bank-form/bank-form.component';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-view-bank',
  templateUrl: './view-bank.component.html',
  styleUrls: ['./view-bank.component.css']
})
export class ViewBankComponent implements OnInit {
  @ViewChild(BankFormComponent, { static: false }) bankForm: BankFormComponent;
  @ViewChild('statusDialog', { static: true }) statusDialog: TemplateRef<any>;
  height: any = 43;
  previousHeight: number = 43;
  innerHeight: number;
  width: number = 70;
  maxHeight: number;
  restoreHeight: number;
  selectedTab: any = 0;

  dataSrc: any = [];
  isEdit: boolean = false;
  bank: masterBank = new masterBank();

  isNodelLabelChange: boolean = false;
  childrenNode: any;
  status: any;

  isCheckForm: boolean = false;
  constructor(private service: ModuleService, private appService: AppService,
    private dialog: MatDialog ) { }

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
      "SchemaName": 'dbo',
      "EntityCategory": 'Master',
      "Entity": 'BANK',
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
    if (node) {
      localStorage.setItem('nodeLabel', node);
      this.childrenNode = node;
      this.isNodelLabelChange = true;
    }
    if (this.bankForm.myForm.touched) {
      this.openDialog();
    } else {
      this.changeNode();

    }

  }
  changeNode() {
    this.releaseLock()
    this.bankDetailsById();
  }
  bankDetailsById() {
    let obj = {
      "BBId": this.childrenNode.Id,
      "_Status": 2
    }
    let url = 'MasterDataApi/GetBankMaster_SF';
    this.service.postData(obj, url).subscribe((data: any) => {
      console.log(data);
      if (data.length != 0) {
        this.bank = data[0];
        console.log(this.bank);
      }
    })
  }
  refresh() {
    this.getTreeData();
  }
  checkPermission() {
console.log(this.bank);
    let url = 'ManageTransactionLockApi/SetContextLock';
    let obj = {
      "Type": 'Master',
      "LockContextType": 'Bank',
      "LockContextValue": this.bank.BBId,
      "UserID": 'A01_Administrator'
    }
    console.log(this.bank.BBId)
    console.log(obj);
    this.service.postData(obj, url).subscribe((data: any) => {
      this.isEdit = data.Status;

    })

  }
  releaseLock() {
    let url = 'ManageTransactionLockApi/ReleaseContextLock';
    let obj = {
      "Type": 'Master',
      "LockContextType": 'Bank',
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
  viewDetails() {
    if (this.bankForm.myForm.touched) {
      this.openDialog();
    } else {
      this.isEdit = false;
      this.releaseLock();
    }
  }
  saveData($event) {
    if ($event.Status == true) {
      this.status = 1
    }
    else {
      this.status = 0
    }
    let object = {
      "BBID":$event.BBId,
      "BankName":$event.BankName,
      "BranchName": $event.BranchName,
      "Location": $event.Location,
      "IFSC": $event.IFSC,
      "Status": this.status,
      "Phone": $event.Phone,
      "Mobile":$event.Mobile,
      "Email": $event.Email,
      "PreviousStatus":1,
    }
    let url = 'MasterDataApi/UpsertBankMaster';
    this.service.postData(object, url).subscribe((data: any) => {
      console.log(data);
      if (data != null) {
        this.appService.showMessage('Saved Successfully', 'X');
        this.isEdit = false;
        this.bankForm.myForm.reset();
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
          this.saveData(this.bank);
          this.closeDialog();
          this.isEdit = false;
          this.bankForm.myForm.reset();
          return true;
       // }
        
      }
      closeDialog() {
        this.dialog.closeAll();
      }
      discardChanges() {

        // if (this.viewGoodsForm.myForm.touched) {
           this.bankForm.myForm.reset();
           this.bankDetailsById();
           this.closeDialog();
           return true;
        // }
         //this.closeDialog();
       }
}
