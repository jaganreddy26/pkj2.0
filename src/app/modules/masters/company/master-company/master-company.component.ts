import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-master-company',
  templateUrl: './master-company.component.html',
  styleUrls: ['./master-company.component.css']
})
export class MasterCompanyComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
  }
  addCompany(){
    this.router.navigate(['/masters/comapny/addcompany',{}])
  }
  viewCompany(){
    this.router.navigate(['/masters/Comapny',{}])
  }

}
