import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Goods } from '../../../../shared/entities/goods';
import { ModuleService } from '../../../module.service';
import { AppService } from '../../../../shared/service/app.service';
import { Location } from '@angular/common';
import { GoodsFormComponent } from '../goods-form/goods-form.component';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {
  @ViewChild(GoodsFormComponent, { static: false }) viewGoodsForm: GoodsFormComponent;
  @ViewChild('statusDialog', { static: true }) statusDialog: TemplateRef<any>;
  goods: Goods = new Goods();
  isEdit: boolean = true;
  status: any = 1;
  constructor(private service: ModuleService, 
    private dialog: MatDialog,private appService: AppService, private location: Location) { }

  ngOnInit() {
  }
  saveData($event) {
    if ($event.Status == true) {
      this.status = 1
    }
    else {
      this.status = 0
    }
    let object = {
      "GoodsName": $event.GoodsName,
      "GoodsType": $event.GoodsType,
      "Status": this.status
    }
    let url = 'MasterDataApi/UpsertGoodsTypeMaster';
    this.service.postData(object, url).subscribe((data: any) => {
      console.log(data);
      this.viewGoodsForm.myForm.reset();
      if (data != null) {
        this.appService.showMessage('Saved Successfully', 'X');
        this.backClicked();
      }
      else {
        this.appService.showMessage('Somethimg went wrong', 'X');
      }
    })
  }
  backClicked() {
    this.location.back();
  }
  saveChanges() {
    if (this.viewGoodsForm.myForm.valid) {
      this.saveData(this.goods);
    }
    else {
      this.appService.showMessage('Please resolve the errors', 'X');
    }
  }
  discardChanges() {
       this.viewGoodsForm.myForm.reset();
       this.closeDialog();
       return true;
   }
   closeDialog() {
    this.dialog.closeAll();
  }
}
