import { Component, OnInit,TemplateRef } from '@angular/core';
import { NgForm } from "@angular/forms";
import { MatDialog } from '@angular/material';
import { ModuleService } from '../../../module.service';
import { AppService } from '../../../../shared/service/app.service';
import {Location} from '@angular/common';
import {Company} from '../../../../shared/entities/company';
import {Business} from '../../../../shared/entities/business';
@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
 company:Company =new Company();
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
  constructor(private dialog: MatDialog,private service:ModuleService,private appService: AppService,private location: Location) { }


  ngOnInit() {
    this.maxHeight = window.innerHeight - 56;
    this.getTreeData();
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
  // addCompany(templateRef: TemplateRef<any>){
  //   this.dialog.open(templateRef,{ disableClose: true });
  // }
  onSubmit(myForm){
    this.dialog.closeAll();
  }
  refresh() {
    this.getTreeData();
  }
  saveData($event){
    console.log($event);
   
  }
}
