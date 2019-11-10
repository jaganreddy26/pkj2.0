import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  @Input() customers :any;
  @Output() saveCustomerEvent = new EventEmitter();
  @Input() isEdit:boolean;
  isEditChild:boolean = false;
  isChanged:boolean = false;
  constructor() { }

  ngOnInit() {
 //   console.log(this.customers)
  }
  saveCustomer(){
    this.saveCustomerEvent.emit(this.customers)
  }
  checkPermission(){
    this.isEditChild = true;
  }
  changeEvent(){
  this.isChanged = true;
  }
}
