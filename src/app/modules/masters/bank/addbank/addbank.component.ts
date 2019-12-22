import { Component, OnInit } from '@angular/core';
import { masterBank } from '../../../../shared/entities/masterBank';
import { ModuleService } from '../../../module.service';
import { AppService } from '../../../../shared/service/app.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-addbank',
  templateUrl: './addbank.component.html',
  styleUrls: ['./addbank.component.css']
})
export class AddbankComponent implements OnInit {

  bank: masterBank = new masterBank();
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
      "BankName":$event.BankName,
      "BranchName": $event.BranchName,
      "Location": $event.Location,
      "IFSC": $event.IFSC,
      "Status": this.status,
      "Phone": $event.Phone,
      "Mobile":$event.Mobile,
      "Email": $event.Email

    }
    let url = 'MasterDataApi/UpsertBankMaster';
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
