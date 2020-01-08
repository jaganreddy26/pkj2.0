import { Component, OnInit,TemplateRef } from '@angular/core';
import { NgForm } from "@angular/forms";
import {Business} from '../../../../shared/entities/business';
import { MatDialog } from '@angular/material';
import { ModuleService } from '../../../module.service';
import { AppService } from '../../../../shared/service/app.service';
import {Location} from '@angular/common';
@Component({
  selector: 'app-add-business',
  templateUrl: './add-business.component.html',
  styleUrls: ['./add-business.component.css']
})
export class AddBusinessComponent implements OnInit {

  business: Business=new Business();
  businessType:any;
  constructor(private dialog: MatDialog,private service:ModuleService,private appService: AppService,private location: Location) { }

  ngOnInit() {
  }
  addBusiness(templateRef: TemplateRef<any>){
    this.dialog.open(templateRef,{ disableClose: true });
   
  
  }
  createBusiness(){
    let object ={
      "Type":this.businessType,
      "ActiveStatus":true
    }
    let url='MasterDataApi/UpsertBusinessType';
    console.log(this.business.Type)
    this.service.postData(object,url).subscribe((data:any)=>{
      console.log(data);
      if (data != null) {
        this.appService.showMessage('Saved Successfully', 'X');
        this.dialog.closeAll();
        this.backClicked();
      }
      else{
        this.appService.showMessage('Somethimg went wrong', 'X');
      }
    })
    
  }
  backClicked() {
    this.location.back();
  }
}
