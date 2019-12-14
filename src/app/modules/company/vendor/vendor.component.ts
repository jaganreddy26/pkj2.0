import { Component, OnInit,Input,Output,EventEmitter,ViewChild} from '@angular/core';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {
@Input() vendors:any;
@Input() isEdit:boolean;
@Output() saveVendorEvent = new EventEmitter();
@Output() checkPermissionEvent = new EventEmitter();
@ViewChild(NgForm, { static: true }) myForm: NgForm;
isEditChild:boolean = false;
isChanged:boolean = false;
constructor() { } 

ngOnInit() {

}
saveVendor(){
  this.saveVendorEvent.emit(this.vendors)

}
checkPermission(){
  this.isEditChild = true;
  this.checkPermissionEvent.emit()
}
changeEvent(){
this.isChanged = true;
}
}
