import { Component, OnInit } from '@angular/core';
import { Goods } from '../../../../shared/entities/goods';
import { ModuleService } from '../../../module.service';
import { AppService } from '../../../../shared/service/app.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {
  goods: Goods = new Goods();
  isEdit: boolean = true;
  status: any = 1;
  constructor(private service: ModuleService, private appService: AppService, private location: Location) { }

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
      "GoodsType":$event.GoodsType,
      "Status": this.status
    }
    let url = 'MasterDataApi/UpsertGoodsTypeMaster';
    this.service.postData(object, url).subscribe((data: any) => {
      console.log(data);
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
}
