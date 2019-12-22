import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-master-bank',
  templateUrl: './master-bank.component.html',
  styleUrls: ['./master-bank.component.css']
})
export class MasterBankComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  addBank(){
    this.router.navigate(['/masters/bank/addbank',{}])
  }
  viewBank(){
    this.router.navigate(['/masters/bank/viewbank',{}])
  }

}
