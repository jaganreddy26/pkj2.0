import { Component, OnInit } from '@angular/core';
import { Agency } from '../../../../shared/entities/agency';
import { ModuleService } from '../../../module.service';
import { AppService } from '../../../../shared/service/app.service';
import {Location} from '@angular/common';
@Component({
  selector: 'app-add-agency',
  templateUrl: './add-agency.component.html',
  styleUrls: ['./add-agency.component.css']
})
export class AddAgencyComponent implements OnInit {

  agency: Agency = new Agency();
  isEdit: boolean = true;
  status: any = 1;
  constructor(private service:ModuleService,private appService: AppService,private location: Location) { }

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
      "AgencyName": $event.AgencyName,
      "Email1": $event.Email1,
      "Email2": $event.Email2,
      "Phone1": $event.Phone1,
      "Phone2": $event.Phone2,
      "Status": this.status
    }
    let url='MasterDataApi/UpsertAgencyMaster';
    this.service.postData(object,url).subscribe((data:any)=>{
      console.log(data);
      if (data != null) {
        this.appService.showMessage('Saved Successfully', 'X');
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
