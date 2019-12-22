import { Component, OnInit } from '@angular/core';
import { Service } from '../../../../shared/entities/service';
import { ModuleService } from '../../../module.service';
import { AppService } from '../../../../shared/service/app.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {
  service: Service = new Service();
  isEdit: boolean = true;
  status: any = 1;
  constructor(private modelservice: ModuleService, private appService: AppService, private location: Location) { }

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
      "ServiceName": $event.ServiceName,
      "ServiceType":$event.ServiceType,
      "Status": this.status
    }
    let url = 'MasterDataApi/UpsertServiceTypeMaster';
    this.modelservice.postData(object, url).subscribe((data: any) => {
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
