import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UBT } from '../../../ubt/ubt';
import { ModuleService } from '../../../module.service';
@Component({
  selector: 'app-master-agency',
  templateUrl: './master-agency.component.html',
  styleUrls: ['./master-agency.component.css']
})
export class MasterAgencyComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  addAgency(){
    this.router.navigate(['/masters/agency/addagency',{}])
  }
  viewAgency(){
    this.router.navigate(['masters/agency/viewagency',{}])
  }
}
